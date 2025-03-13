import os
import csv
import re
import fitz  # PyMuPDF for PDFs
import docx
import spacy
from flask import Flask, render_template, request, redirect, url_for

# Initialize Flask app
app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = "uploads"
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

# Load NLP model
nlp = spacy.load("en_core_web_sm")

# CSV File
CSV_FILE = "resume_data.csv"

# Ensure CSV file exists
if not os.path.exists(CSV_FILE):
    with open(CSV_FILE, mode="w", newline="", encoding="utf-8") as file:
        writer = csv.writer(file)
        writer.writerow([
            "Full Name", "Email", "Phone Number", "Home Address",
            "Total Experience (Years)", "Internships (Years)", "Past Jobs",
            "Last Job Position", "Last Job Start Date", "Last Job End Date",
            "Company Name (Last Job)", "Company Location (Last Job)",
            "Rating from Last Job", "Reason for Leaving Last Job",
            "Education Level", "Certifications", "Technical Skills",
            "Resume File Name", "Resume Source (PDF/DOCX)"
        ])

# Function to extract text from PDF
def extract_text_from_pdf(filepath):
    text = ""
    with fitz.open(filepath) as doc:
        for page in doc:
            text += page.get_text()
    return text

# Function to extract text from DOCX
def extract_text_from_docx(filepath):
    doc = docx.Document(filepath)
    return "\n".join([para.text for para in doc.paragraphs])

# Function to check for duplicates
def is_duplicate_entry(name, email):
    with open(CSV_FILE, mode="r", encoding="utf-8") as file:
        reader = csv.reader(file)
        for row in reader:
            if len(row) > 1 and row[0] == name and row[1] == email:
                return True
    return False

# Function to extract key details from text
def extract_details(text):
    doc = nlp(text)

    name = None
    email = None
    phone = None
    address = None
    jobs = []
    rating = None
    experience = 0
    education = None

    programming_languages = {"C++", "Java", "Python", "JavaScript", "C#", "Ruby", "Swift"}

    # Extract email
    emails = re.findall(r"[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+", text)
    if emails:
        email = emails[0]

    # Extract phone number
    phones = re.findall(r"\+?\d{10,15}", text)
    if phones:
        phone = phones[0]

    # Extract name (first entity in text)
    for ent in doc.ents:
        if ent.label_ == "PERSON" and ent.text not in programming_languages:
            name = ent.text
            break

    # Extract name fallback (from first capitalized words if NLP fails)
    if not name:
        words = text.split(" ")[:5]
        capitalized_words = [w for w in words if w.istitle() and w not in programming_languages]
        if capitalized_words:
            name = " ".join(capitalized_words)

    # Extract address
    for ent in doc.ents:
        if ent.label_ in ["GPE", "LOC"]:
            address = ent.text
            break

    # Extract jobs and calculate experience
    job_keywords = ["engineer", "developer", "manager", "analyst", "consultant"]
    lines = text.split("\n")
    last_job = None

    for line in lines:
        if any(job in line.lower() for job in job_keywords):
            jobs.append(line.strip())
            last_job = line.strip()
        if "years" in line.lower() or "yr" in line.lower():
            exp_match = re.findall(r"\d+", line)
            if exp_match:
                experience = max(experience, int(exp_match[0]))

    # Extract rating (if mentioned)
    rating_match = re.search(r"rating[:]? (\d(\.\d)?)", text, re.IGNORECASE)
    if rating_match:
        rating = rating_match.group(1)

    # Extract education level
    edu_match = re.search(r"(Bachelor's|Master's|PhD|Diploma)", text, re.IGNORECASE)
    if edu_match:
        education = edu_match.group(1)

    return {
        "name": name,
        "email": email,
        "phone": phone,
        "address": address,
        "experience": experience,
        "jobs": "; ".join(jobs),
        "last_job": last_job,
        "rating": rating,
        "education": education
    }

# Flask Routes
@app.route("/", methods=["GET", "POST"])
def index():
    if request.method == "POST":
        if "resume" not in request.files:
            return "No file uploaded"

        file = request.files["resume"]
        if file.filename == "":
            return "No selected file"

        if file:
            filepath = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
            file.save(filepath)

            filetype = file.filename.split(".")[-1].lower()

            if filetype == "pdf":
                text = extract_text_from_pdf(filepath)
            elif filetype == "docx":
                text = extract_text_from_docx(filepath)
            else:
                return "Unsupported file format"

            details = extract_details(text)

            # Prevent duplicate entries
            if is_duplicate_entry(details["name"], details["email"]):
                return "Duplicate entry detected, skipping save."

            # Save extracted data to CSV
            with open(CSV_FILE, mode="a", newline="", encoding="utf-8") as file:
                writer = csv.writer(file)
                writer.writerow([
                details["name"], details["email"], details["phone"], details["address"],
                details["experience"], "", details["jobs"],
                details["last_job"], "", "",
                "", "", details["rating"], "",
                details["education"], "", "",
                os.path.basename(filepath), filetype.upper()  # Fix applied here
            ])
            return redirect(url_for("index"))

    return render_template("index.html")

if __name__ == "__main__":
    app.run(debug=True)

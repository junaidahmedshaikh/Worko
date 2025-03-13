from flask import Flask, request, jsonify
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from flask_cors import CORS  # Allow React to call Flask API

app = Flask(__name__)
CORS(app)  

job_data = pd.DataFrame({
    'JobID': [1, 2, 3],
    'JobTitle': ['Data Scientist', 'Java Developer', 'AI Specialist'],
    'Description': [
        'Use machine learning algorithms to analyze large datasets and build predictive models.',
        'Develop applications using Java, with experience in front-end frameworks like Angular.',
        'Work on cutting-edge AI technologies, including natural language processing and computer vision.'
    ]
})


def recommend_jobs(skills):
    tfidf_vectorizer = TfidfVectorizer(stop_words='english')
    descriptions = job_data['Description'].tolist() + [skills]
    tfidf_matrix = tfidf_vectorizer.fit_transform(descriptions)
    job_vectors = tfidf_matrix[:len(job_data)]
    applicant_vector = tfidf_matrix[len(job_data):]
    similarity_scores = cosine_similarity(applicant_vector, job_vectors)
    top_jobs = similarity_scores[0].argsort()[-3:][::-1]
    recommendations = job_data.iloc[top_jobs]['JobTitle'].tolist()
    return recommendations


@app.route('/recommend', methods=['POST'])
def recommend():
    data = request.get_json()
    skills = data.get('skills', '')
    recommendations = recommend_jobs(skills)
    return jsonify({"recommendations": recommendations})

if __name__ == '__main__':
    app.run(debug=True, port=5001)  # Run on port 5001

from flask import Flask, request, jsonify
import firebase_admin
from firebase_admin import credentials, firestore

app = Flask(__name__)

cred = credentials.Certificate('../firebase_credentials.json')
firebase_admin.initialize_app(cred)
db = firestore.client()

@app.route('/submit', methods=['POST'])
def submit():
    student_id = request.form['student_id']
    student_name = request.form['student_name']
    
    # Capture responses for all the questions
    responses = {f'q{i}': int(request.form[f'q{i}']) for i in range(1, 19)}

    # Calculations for Part A, Part B, etc.
    parta_score = sum(1 for i in range(1, 7) if responses[f'q{i}'] >= 3)
    partb_score = sum(1 for i in range(7, 19) if responses[f'q{i}'] >= 3)
    inattentive_subscale_score = sum(responses[f'q{i}'] for i in [1, 2, 3, 4, 7, 8, 9, 10])
    motor_impulsive_subscale_score = sum(responses[f'q{i}'] for i in [5, 6, 11, 12, 13])
    verbal_impulsive_subscale_score = sum(responses[f'q{i}'] for i in [14, 15, 16, 17])
    total_score = parta_score + partb_score

    # Save the data to Firestore
    doc_ref = db.collection('adhd_responses').document(student_id)
    doc_ref.set({
        'student_name': student_name,
        'student_id': student_id,
        'question_responses': responses,
        'parta_score': parta_score,
        'partb_score': partb_score,
        'inattentive_subscale_score': inattentive_subscale_score,
        'motor_impulsive_subscale_score': motor_impulsive_subscale_score,
        'verbal_impulsive_subscale_score': verbal_impulsive_subscale_score,
        'total_score': total_score
    })

    # Return results as JSON for the React frontend
    return jsonify({
        'total_score': total_score,
        'parta_score': parta_score,
        'partb_score': partb_score,
        'inattentive_subscale_score': inattentive_subscale_score,
        'motor_impulsive_subscale_score': motor_impulsive_subscale_score,
        'verbal_impulsive_subscale_score': verbal_impulsive_subscale_score
    })

if __name__ == '__main__':
    app.run(debug=True)

from app import app, mail
from flask import render_template, request, redirect, url_for, flash
from flask_mailing import Message  # type: ignore

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/send-email', methods=['POST'])
def send_email():
    name = request.form['name']
    email = request.form['email']
    subject = request.form['subject']
    message = request.form['message']

    msg = Message(f'Neue Nachricht erhalten von {name}',
                  sender=app.config['MAIL_USERNAME'],
                  recipients=[app.config['MAIL_USERNAME']])
    msg.body = f"Name: {name}\nEmail: {email}\n\n{message}"

    try:
        mail.send(msg)
        flash('Nachricht erfolgreich gesendet!', 'success')
    except Exception as e:
        print(e)
        flash('Fehler beim Senden der Nachricht.', 'danger')

    return redirect(url_for('index'))

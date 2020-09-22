from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, BooleanField, PasswordField
from wtforms.validators import ValidationError, DataRequired, Email, EqualTo
from database.models import User
from mongoengine import DoesNotExist


class LoginForm(FlaskForm):
    username = StringField('username', validators=[DataRequired()])
    email = StringField('email',  validators=[DataRequired()])
    password = PasswordField('Password', validators=[DataRequired()])
    remember_me = BooleanField('Remember Me')
    submit = SubmitField('Login')

class RegistrationForm(FlaskForm):
    username = StringField('Username', validators=[DataRequired()])
    email = StringField('Email', validators=[DataRequired(), Email()])
    password = PasswordField('Password', validators=[DataRequired()])
    password2 = PasswordField(
        'Repeat Password', validators=[DataRequired(), EqualTo('password')])
    submit = SubmitField('Register')

    def validate_username(self, username):
        
        user = User.query.filter_by(username=username.data).first()
        print(user)
        if(user is not None):
            raise ValidationError('Username not available.')
        else:
            return True

    def validate_email(self, email):

        user = User.query.filter_by(email=email.data).first()
        print(user)
        if(user is not None):
            raise ValidationError('Email address not available.')
        else:
            return True
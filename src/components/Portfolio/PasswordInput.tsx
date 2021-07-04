import React from 'react'
import {Formik, Form, Field,useField} from 'formik';
import theme, {commonStyles} from '../../theme';
import * as yup from 'yup'
import {Button} from 'react-bootstrap';
import FormikTextInput from '../common/FormikTextInput'

const validationSchema = yup.object().shape({
    password: yup
        .string()
        .min(6, 'Password should be at least 6 characters long')
        .required('Password is required'),
    passwordConfirmation: yup
        .string()
        .oneOf([yup.ref('password'), null],'Passwords must match')
})

const styles = {
    passwordContainer: {
        display: 'flex',
        flexDirection:'column',
        justifyContent:'space-around',
        width: '300px',
    },
    errorText: {
        marginLeft: theme.distance.tiny,
        color: theme.colors.warning
    }
}


const PasswordInput:React.FC<{onSubmit: ({password}: {password:string}) => Promise<void>}> = ({onSubmit}) => {
    return(
        <Formik  onSubmit={onSubmit} initialValues={{password:'', passwordConfirmation: ''}} validationSchema={validationSchema}>
            <Form style={{...commonStyles.outerContainer as React.CSSProperties, width:'300px', height:'500px'}}>
                <div>
                    <FormikTextInput name='password' placeholder='Input your password here...' type='password'
                        style={{...commonStyles.textBox as React.CSSProperties, width:'300px'}}
                    />
                    <FormikTextInput name='passwordConfirmation' placeholder='Confirm your password...' type='password'
                        style={{...commonStyles.textBox as React.CSSProperties, width:'300px'}}
                    />
                </div>
                <Button type='submit' style={commonStyles.largeButton}>Submit</Button>
            </Form>
        </Formik>
    )
}

export default PasswordInput

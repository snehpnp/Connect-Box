import React from 'react'
import Formikform from "../../../Components/ExtraComponents/forms/Formik_form"
import { useFormik } from 'formik';
 
import Content from '../../../Components/Dashboard/Content/Content';
 



const AddClient = () => {


    const formik = useFormik({
        initialValues: {
            initialValues: {
                username: '',
                fullName: '',
                email: '',
                mobile: '',



            },

        },
        validate: (values) => {

            const errors = {};
            if (!values.username && formik.touched.username) {
                errors.username = "Error";
            }

            return errors;
        },
        onSubmit: async (values) => {
            const req = {
                "UserName": values.username,
            }
        }
    });



    const fields = [
        { name: 'username', label: 'Username', type: 'text', label_size: 12, col_size: 6, disable: false },
        { name: 'fullName', label: 'FullName', type: 'text', label_size: 12, col_size: 6, disable: false },
        { name: 'email', label: 'Email', type: 'text', label_size: 12, col_size: 6, disable: false },
        { name: 'mobile', label: 'Mobile', type: 'text', label_size: 12, col_size: 6, disable: false },

    ];


    return (
        <>
            <div>
                <Content Page_title="Add Client" button_title='Back' route="/admin/allclients">
                    <Formikform fieldtype={fields.filter(field => !field.showWhen || field.showWhen(formik.values))} formik={formik} btn_name="Add Client"
                        fromDate={formik.values.fromDate}
                        toDate={formik.values.todate}
                    />

                    {/* <ToastButton /> */}
                </Content >

            </div>

        </>
    )
}
export default AddClient


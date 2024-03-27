
import DynamicForm from '../../../Components/ExtraComponents/forms/FormField';
import { useFormik } from 'formik';
import axios from 'axios'; // Ensure Axios is imported
import * as Yup from 'yup';

const AddClient = () => {
  const userDetails = JSON.parse(localStorage.getItem("user_details"));
  const Role = userDetails?.Role;
  const user_id = userDetails?.user_id;
  const user_token = userDetails?.token;

  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required('Full Name is required'),
    username: Yup.string().required('Username is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    phone: Yup.string().required('Phone No is required'),
    balance: Yup.string().required('Balance is required'),
    password: Yup.string().required('Password is required'),
    prifix_key: Yup.string().required('Prefix Key is required'),
    subadmin_servic_type: Yup.string().required('Subadmin Service Type is required'),
  });

  const fields = [
    { name: 'fullName', label: 'FullName', type: 'text', label_size: 6, col_size: 6, disable: false },
    { name: 'username', label: 'Username', type: 'text', label_size: 12, col_size: 6, disable: false },
    { name: 'email', label: 'Email', type: 'text', label_size: 12, col_size: 6, disable: false },
    { name: 'phone', label: 'Phone No', type: 'number', label_size: 12, col_size: 6, disable: false },
    { name: 'balance', label: 'Balance', type: 'text', label_size: 12, col_size: 6, disable: false },
    { name: 'password', label: 'password', type: 'password', label_size: 12, col_size: 6, disable: false },
    { name: 'prifix_key', label: 'Prifix Key', type: 'text', label_size: 12, col_size: 6, disable: false },
    {
      name: 'subadmin_servic_type', label: 'Subadmin Servic Type', type: 'select',
      options: [
        { label: 'Per Trade', value: '0' },
        { label: 'Per Strategy', value: '1' },
      ]
      , label_size: 12, col_size: 6, disable: false
    },

  ];

  const ProfileShow = 1;

  const formik = useFormik({
    initialValues: {
      fullName: '',
      username: '',
      email: '',
      phone: '',
      balance: '',
      password: '',
      prifix_key: '',
      subadmin_servic_type: '0',
      strategy_Percentage: '0',
      Per_trade: '0',
      parent_id: null,
      parent_role: null,

    },
    validate: () => {
      const errors = {
      };
      return errors;
    },
    validationSchema:validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      // console.log("Submitting form data:", values);
      const payload = {
        ProfileImg: '',
        FullName: values.fullName,
        UserName: values.username,
        Email: values.email,
        PhoneNo: values.phone,
        Balance: values.balance,
        subadmin_service_type: values.subadmin_servic_type,
        strategy_Percentage: values.strategy_Percentage,
        Per_trade: values.Per_trade,
        prifix_key: values.prifix_key,
        password: values.password,
        parent_id: user_id || "65feb434ce02a722ac3b997d",
        parent_role: Role || "ADMIN",
      };
      console.log("PAYLOAD",payload)
      setSubmitting(false);
      try {
        const response = await axios.post('http://localhost:7000/subadmin/add', payload, {
          headers: { 'Content-Type': 'application/json' }
        });
        console.log("Response from AddSubAdmin:", response.data);
      } catch (error) {
        console.error("Error adding subadmin:", error);
      } finally {
        setSubmitting(false); // Reset the form submission state
      }
    }
  });

  console.log("Formik values:", formik.values); 
  console.log("Formik errors:", formik.errors); 

  return (
    <DynamicForm
      ProfileShow={ProfileShow}
      fields={fields}
      page_title="Add Subadmin"
      btn_name="Add Subadmin"
      btn_name1="Cancel"
      formik={formik}
    />
  );
};
export default AddClient;
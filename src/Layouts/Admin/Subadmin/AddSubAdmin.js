import React from 'react';
import DynamicForm from '../../../Components/ExtraComponents/forms/FormField';

const AddClient = () => {
  const fields = [
    { name: 'fullName', label: 'FullName', type: 'text', label_size: 6, col_size: 6, disable: false },
    { name: 'username', label: 'Username', type: 'text', label_size: 12, col_size: 6, disable: false },
    { name: 'email', label: 'Email', type: 'text', label_size: 12, col_size: 6, disable: false },
    { name: 'phone', label: 'Phone No', type: 'number', label_size: 12, col_size: 6, disable: false },
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

  return (
    <>
     
      <DynamicForm
        ProfileShow={ProfileShow}
        fields={fields}
        page_title="Add Subadmin"
        btn_name="Add Subadmin"
      />
    </>

  );
};

export default AddClient;

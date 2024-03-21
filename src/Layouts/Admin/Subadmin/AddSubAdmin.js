import React from 'react';
import DynamicForm from '../../../Components/ExtraComponents/forms/FormField';

const AddClient = () => {
  const fields = [
      { name: 'username', label: 'Username', type: 'text', label_size: 3, col_size: 6, disable: true },
      { name: 'fullName', label: 'FullName', type: 'text', label_size: 2, col_size: 6, disable: false },
      { name: 'email', label: 'Email', type: 'text', label_size: 2, col_size: 6, disable: true },
      { name: 'mobile', label: 'Mobile', type: 'text', label_size: 2, col_size: 6, disable: true },
  ];

  return (
  <DynamicForm fields={fields} />
  );
};

export default AddClient;

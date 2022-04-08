// handle errors
export const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: "", password: ""};

  // DUPLICATE ERROR CODE
  if (err.code === 11000) {
    errors.email = 'That email is already registered'
    // return errors
  };

  // validation errors
  if (err.message.includes('User validation failed')) {
    // console.log(err);
    // console.log(err.errors);
    // console.log(Object.values(err.errors))

    // Object.values(err.errors).forEach(error => {
    //   console.log(error.properties)
    // })

    Object.values(err.errors).forEach(({ properties }) => {
      // console.log(properties)
      errors[properties.path] = properties.message
    });

    // console.log(errors)
    // return errors
  };

  // INCORRECT EMAIL
  if (err.message === 'incorrect email') {
    errors.email = 'That email is not registered'
  }

  //INCORRECT PASSWORD
  if (err.message === 'incorrect password') {
    errors.password = 'incorrect password'
  }

  if (err.message === 'Please enter password') {
    errors.password = 'Please enter password'
  }

  return errors
};
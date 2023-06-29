import React, { useState } from "react";

function FoodForm() {
    const [formData, setFormData] = useState({food: '', country: ''});
    const [countryData, setCountryData] = useState({american: false, italy: false, mexico: false, spain: false, rest: false})
    function handleChange(e) {
        if (e.target.name === "food" && e.target.value.length > 10) {
        } else {
            setFormData({...formData, [e.target.name]: e.target.value});
        }
    }
    function handleSubmit(e) {
        e.preventDefault();
        if (formData.country.toLocaleLowerCase() === 'american') {
            setCountryData({american: true, italy: false, mexico: false, spain: false, rest: false})
        } else if (formData.country.toLocaleLowerCase() === 'italy') {
            setCountryData({american: false, italy: true, mexico: false, spain: false, rest: false})
        } else if (formData.country.toLocaleLowerCase() === 'mexico') {
            setCountryData({american: false, italy: false, mexico: true, spain: false, rest: false})
        } else if (formData.country.toLocaleLowerCase() === 'spain') {
            setCountryData({american: false, italy: false, mexico: false, spain: true, rest: false})
        } else {
            setCountryData({american: false, italy: false, mexico: false, spain: false, rest: true})
        }
        setFormData({food: '', country: ''});
    }
    return (
      <div>
        <form onSubmit={handleSubmit}>
            <label>Favorite Food:</label>
            <input name="food" value={formData.food} onChange={handleChange} />
            <label>Country of Origin:</label>
            <input name="country" value={formData.country} onChange={handleChange} />
            <button>Submit</button>
        </form>
        {countryData.american ? <h1>Delicious!</h1> : null}
        {countryData.italy ? <h1>Delizioso!</h1> : null}
        {countryData.mexico || countryData.spain ? <h1>Delicioso!</h1> : null}
        {countryData.rest ? <h1>Yummy!</h1> : null}
      </div>
    );
  }
  
  export default FoodForm;



  /*
  In the Food Form component:
Create a controlled component with:
A field for a user to type the name of their favorite food
Do not let a user enter more than ten characters for the food
A field for a user to type the food’s country of origin
A Submit button
When a User submits the form:
The form should clear
If the country of origin is American, render a h1 with the text Delicious!
If the country of origin is Italy, render a h1 with the text Delizioso!
If the country of origin is Mexico or Spain, render a h1 with the text Delicioso!
If the country of origin is not one of those countries, render a h1 with the text Yummy!
This message should not be displayed before a user submits the form
If the User fills out the form again, the text should update
  */
import React, {useState } from 'react';

const Form = () =>{
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const [isSubmitted, setIsSubmitted] = useState(0);
    const [isFailed, setIsFailed] = useState(0);
    const [formVisibility, setFormVisibility] = useState(1);

    const handleSubmit = async(e) => {
        e.preventDefault();
        const data = {
          "firstName": firstName,
          "lastName":lastName,
          "email":email,
          "message":message
        }
        console.log(firstName,lastName,email,message);


        // Make an Ajax call
        try{

        const result = await fetch('http://localhost:8080/submit-contact-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        });

        if(result.status===201){
          setIsFailed(0)
          setFormVisibility(0)
          setIsSubmitted(1)
        }else{
          setIsSubmitted(0)
          setIsFailed(1)
          setFormVisibility(1)
        }


        }catch(error) {
          setIsSubmitted(0)
          setIsFailed(1)
          setFormVisibility(1)
        };

    }

    return(
      <div className="contactdiv">
        {isFailed? <p className='failerPara'>Something went wrong, please try again.</p>:null}
        {isSubmitted?<p className='successPara'>Submitted successfully, we will get back to you soon.</p>:null}
        {formVisibility?<form onSubmit={handleSubmit}>
            <h2>Contact Us:</h2>
            <input type="text" className='i1' placeholder='First Name' value={firstName} onChange={e=>setFirstName(e.target.value)} maxLength={25} required/>
            <input type="text" className='i1' placeholder='Last Name' value={lastName} onChange={e=>setLastName(e.target.value)} maxLength={25} required/>
            <input type="email" className='i1' placeholder='Email' value={email} onChange={e=>setEmail(e.target.value)} maxLength={50} required/>
            <textarea rows="8" className='i1 i2' placeholder="Message" value={message} onChange={e=>setMessage(e.target.value)} maxLength={500} required></textarea>
            <button type='submit' className='buttonClass'>Submit</button>
        </form>:null}
      </div>
    )
}

export default Form;
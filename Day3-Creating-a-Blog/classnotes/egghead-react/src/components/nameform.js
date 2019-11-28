import React from 'react';

class NameForm extends React.Component {
    state = {
        errorMessage: true
    }

    handleSubmit = e => {
        e.preventDefault();
        console.log(e.target.elements.username.value);
    }

    handleChange = e => {
        const userNameInput = e.target.value;
        const status = this.validateUserName(userNameInput);

        this.setState({
            errorMessage: status
        });
    }

    validateUserName(userName) {
        if(userName.length < 3) {
            return "The username must be at least 3 characters long";
        } else if(userName.indexOf("!") < 0){
            return "The username must contain a special character";
        }

        return '';
    }

    render() {
        const errorStyle = { fontSize: '20px', background: 'lightcoral' };

        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Name: 
                    <input type="text" name="username" onChange={this.handleChange}/>
                </label>
                <div style={errorStyle}>{this.state.errorMessage}</div>
                <button disabled={this.state.errorMessage} type="submit">Submit</button>
            </form>
        )
    }
}

export default NameForm
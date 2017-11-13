import React, {Component} from 'react';
import PropTypes from 'prop-types';
import '../App.css';

class Login extends Component {
    static propTypes = {
    handleSubmit: PropTypes.func.isRequired
    };

    state = {
        firstname: '',
        lastname: '',
        email: '',
        username: '',
        password: '',
        signIn: true

    };


    componentWillMount() {
        this.setState({
            username: '',
            password: ''
        });

    }



    renderSignIn() {

        return (
            <div>
                <div className="row justify-content-md-center">
                    <span className="dropbox-2015 dropbox-logo-2015 container">
                    <header className="mast-head">
                        <nav className="mast-head__nav mast-head-nav">
                            <img
                                src="https://cfl.dropboxstatic.com/static/images/logo_catalog/dropbox_logo_glyph_2015_m1-vfleInWIl.svg"
                                alt="" className="dropbox-logo__glyph"/>

                            <img
                                src="https://cfl.dropboxstatic.com/static/images/logo_catalog/dropbox_logo_text_2015_m1-vflV-vZRB.svg"
                                alt="" className="dropbox-logo__type"/>
                        </nav>
                        </header>
                    </span>
                </div>

                <br/><br/><br/><br/><br/><br/>


                <div className="row justify-content-md-center">
                    {/* <div className="col-md-6">
                        <img src="https://cfl.dropboxstatic.com/static/images/empty_states/rebrand_m1/sign-in-illo-vfl_t3XMB.png"

                             alt="" className="login-or-register-img"/>
                    </div> */}

                    <div className="col-md-4">

                        <form>
                            <div className="form-group">
                                <div className="login-register-header">Sign in</div>
                            </div>
                            <div className="login-register-switch">
                                <label className="login-register-switch-link"
                                       onClick={()=>{
                                        this.setState({
                                            signIn: false
                                        });
                                    }
                                    }
                                >
                                    Don't have an account? Create one
                                </label>


                            </div>

                            <br/>
                            <div className="form-group">
                                <hr/>
                                <input
                                    className="form-control"
                                    type="text"
                                    label="Username"
                                    placeholder="Email"
                                    value={this.state.username}
                                    onChange={(event) => {
                                        this.setState({
                                            username: event.target.value
                                        });
                                    }}
                                />
                            </div>

                            <div className="form-group">
                                <input
                                    className="form-control"
                                    type="password"
                                    label="password"
                                    placeholder="Password"
                                    value={this.state.password}
                                    onChange={(event) => {
                                        this.setState({
                                            password: event.target.value
                                        });
                                    }}
                                />
                            </div>
                            <div className="form-group">
                                <div className="row">
                                    <div className="col-md-6">
                                        <br/>
                                        <input className="checkbox_label" type="checkbox" id="cb" name="remember me"/>

                                        <label className="checkbox_label">Remember me</label>
                                    </div>
                                    <div className="col-md-4">
                                        <br/>
                                        <button
                                            className="btn btn-primary Sign-in-button"
                                            type="button"
                                            onClick={this.props.handleSubmit.bind(this,(this.state))}>
                                            Sign in
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );


    }

    renderSignUp() {


        return (
            <div>
                <div className="row justify-content-md-center">
                    <span className="dropbox-2015 dropbox-logo-2015 container">
                    <header className="mast-head">
                        <nav className="mast-head__nav mast-head-nav">
                            <img
                                src="https://cfl.dropboxstatic.com/static/images/logo_catalog/dropbox_logo_glyph_2015_m1-vfleInWIl.svg"
                                alt="" className="dropbox-logo__glyph"/>

                            <img
                                src="https://cfl.dropboxstatic.com/static/images/logo_catalog/dropbox_logo_text_2015_m1-vflV-vZRB.svg"
                                alt="" className="dropbox-logo__type"/>
                        </nav>
                        </header>
                    </span>
                </div>

                <br/><br/><br/><br/><br/><br/>


                <div className="row justify-content-md-center">
                    {/* <div className="col-md-6">
                        <img
                            src="https://cfl.dropboxstatic.com/static/images/empty_states/rebrand_m1/sign-in-illo-vfl_t3XMB.png"

                            alt="" className="login-or-register-img"/>
                    </div> */}

                    <div className="col-md-6">

                        <form>
                            <div className="form-group">
                                <div className="login-register-header">Create an account</div>
                            </div>
                            {/* <div className="login-register-switch">
                                <label onClick={()=>{
                                    this.setState({
                                        signIn: true
                                    });}}
                                       className="login-register-switch-link">
                                        or log in
                                </label>
                            </div> */}

                            <br/>
                            <div className="form-group">
                                <hr/>
                                <input
                                    className="form-control"
                                    type="text"
                                    label="FirstName"
                                    placeholder="First name"
                                    value={this.state.firstname}
                                    onChange={(event) => {
                                        this.setState({
                                            firstname: event.target.value
                                        });
                                    }}
                                />
                            </div>

                            <div className="form-group">
                                <hr/>
                                <input
                                    className="form-control"
                                    type="text"
                                    label="LastName"
                                    placeholder="Last name"
                                    value={this.state.lastname}
                                    onChange={(event) => {
                                        this.setState({
                                            lastname: event.target.value
                                        });
                                    }}
                                />
                            </div>

                            <div className="form-group">
                                <hr/>
                                <input
                                    className="form-control"
                                    type="text"
                                    label="Email"
                                    placeholder="Email"
                                    value={this.state.email}
                                    onChange={(event) => {
                                        this.setState({
                                            email: event.target.value
                                        });
                                    }}
                                />
                            </div>

                            <div className="form-group">
                                <input
                                    className="form-control"
                                    type="password"
                                    label="password"
                                    placeholder="Password"
                                    value={this.state.password}
                                    onChange={(event) => {
                                        this.setState({
                                            password: event.target.value
                                        });
                                    }}
                                />
                            </div>
                            <div className="form-group">
                                <div className="row">
                                    <div className="col-md-6">
                                        <br/>
                                        <input className="checkbox_label" type="checkbox" id="cb" name="remember me"/>

                                        <label className="checkbox_label"> I agree to dropbox terms.</label>
                                    </div>
                                    <div className="col-md-6">
                                        <br/>
                                        <button
                                            className="btn btn-primary Sign-in-button"
                                            type="button"
                                            onClick={this.props.handleCreateAccount.bind(this, JSON.stringify(this.state))}>
                                            Create an account
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );


    }


    render() {
        if (this.state.signIn) {

            return this.renderSignIn();
        } else {
            return this.renderSignUp();
        }
    }

}


export default Login;

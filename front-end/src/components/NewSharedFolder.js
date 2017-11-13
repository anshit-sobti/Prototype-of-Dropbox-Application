import React, {Component} from 'react';
//import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import '../App.css';
//import TextField from 'material-ui/TextField';
//aimport * as API from '../api/API';
// import folderIcon1 from '../folder.png';


class NewSharedFolder extends Component {
    static propTypes = {

        createSharedFolder: PropTypes.func.isRequired
        //images: PropTypes.array.isRequired
    };

    constructor() {
        super();
        this.state = {
            sharedFolderName: '',
            userlist: ''
        }
    }

    render() {
        return (
            <div className={'row imageGridStyle'}>
                <div className={'col-md-2'}>
                </div>
                <div className={'col-md-2'}>
                {/* <img alt="myImg" src={folderIcon1}/> */}
                <input placeholder={'Folder Name'} value={this.state.sharedFolderName} onChange={(event) => {
                    this.setState({
                        sharedFolderName: event.target.value
                    });
                }}/>

                </div>
                <div className={'col-md-2'}>
                    <input placeholder={'Recepient email'} value={this.state.userlist} onChange={(event) => {
                        this.setState({
                            userlist: event.target.value
                        });
                    }}/>
                </div>
                <div className={'col-md-6'}>
                    <button className="btn btn-primary navuploadButton"
                            type="submit"
                            onClick={this.props.createSharedFolder.bind(this, JSON.stringify(this.state))}>
                        Create a folder
                    </button>
                <br/>
                <div className="myStyle-main4">
                    <hr/>
                </div>
                </div>
            </div>

    );
    }
    }

    export default NewSharedFolder;

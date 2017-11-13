import React, {Component} from 'react';
//import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import '../App.css';
// import newfolderIcon from '../folder.png';


class NewFolder extends Component {

    static propTypes = {

        createFolder: PropTypes.func.isRequired
        //images: PropTypes.array.isRequired
    };
    constructor() {
        super();
        this.state = {
            folderName: ''
        }
    }


    render() {
        return (
            <div>
                {/* <img alt="myImg" src={newfolderIcon}/> */}
                <input
                    placeholder={'Enter new folder name'}
                    value={this.state.folderName} onChange={(event) => {
                    this.setState({
                        folderName: event.target.value
                    });
                }}/>
                <button
                    className="btn btn-primary navuploadButton "
                    type="submit"
                    onClick={this.props.createFolder.bind(this,JSON.stringify(this.state))}>
                    Create a folder
                </button>
                <br/><div className="myStyle-main4"><hr/></div>

            </div>

        );
    }
}
export default NewFolder;

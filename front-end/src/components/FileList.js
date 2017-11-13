import React, {Component} from 'react';
import PropTypes from 'prop-types';
import '../App.css';
import * as API from '../api/API';
//import Icon from '../smallFolderIcon.png';
//import paperIcon from '../paperIcon.png';
import folderIcon from '../folder.png';
import NewFolder from "./NewFolder";
import NewSharedFolder from "./NewSharedFolder";



class FileList extends Component {

    static propTypes = {
        // classes: PropTypes.object.isRequired,
        images: PropTypes.array.isRequired,
        listFiles: PropTypes.func.isRequired,
        handleLogout: PropTypes.func.isRequired


    };

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            images: [],
            filename: '',
            starredfile: [],
            imageStarred: false,
            newfolder: false,
            newSharedfolder: false

        }
    }

    componentWillMount() {
        console.log('FL inside compnt will mount1', this.state.username);


        API.getImages()
            .then((data) => {
                this.setState({
                    images: data.resArray,
                    username: data.objectSession,
                    imageStarred: data.resArray.starred
                });
            });
        console.log('FL inside compnt will mount2', this.state.username);
        console.log('imageStarred:', this.state.imageStarred);
    }

    handleFileUpload = (event) => {
        console.log('handleFileUP function:current user', this.state.username);
        const payload = new FormData();
        payload.append('username', this.state.username);
        payload.append('mypic', event.target.files[0]);
        API.uploadFile(payload)
            .then((status) => {
                if (status === 201) {
                    API.getImages()
                        .then((data) => {
                            this.setState({
                                images: data.resArray
                            });
                        });
                }
            });
    };

    handleDelete = (payload) => {
        console.log("payload received 1", payload);
        API.deleteFile(payload)
            .then((status) => {
                if (status === 201) {
                    console.log("File deleted successfully");
                    API.getImages()
                        .then((data) => {
                            this.setState({
                                images: data.resArray,
                                username: data.objectSession,
                                imageStarred: data.resArray.starred
                            });
                        });
                }
            });

    };

    createFolder = (payload) => {
        API.createFolder(payload)
            .then((status) => {
                if (status === 201) {
                    API.getImages()
                        .then((data) => {
                            this.setState({
                                images: data.resArray,
                                newfolder: false
                            });
                        });
                }
            });
    };

    createSharedFolder = (payload) => {
        API.createSharedFolder(payload)
            .then((status) => {
                if (status === 201) {
                    API.getImages()
                        .then((data) => {
                            this.setState({
                                images: data.resArray,
                                newSharedfolder: false

                            });
                        });
                }
            });
    };

    handleStar = (payload) => {
        console.log('payload:', payload);
        this.state.starredfile.push(payload[0]);
        console.log('state star file array after push:', this.state.starredfile);

    };

    handleUnStar = (payload) => {
        console.log('payload in hadnleUnstar1:', payload);

        this.state.starredfile.pop(payload[0]);


        console.log('state star file array after pop:', this.state.starredfile);

    };


    render() {
        const classes = this.props;


        return (

            <div className={classes.root}>
                <div className="row">
                    <div className="col-md-9 imageGridStyle ">
                        <h3 className="myStyle-main">Home</h3><br/>
                        <h5 className="myStyle-main2">Starred</h5>
                        {this.state.starredfile.map(tile => (

                            <div className="imageGridStyle " key={tile.img}>
                                <a className="myStyle-main3" href={'http://localhost:3001/' + tile.img}
                                   alt={'myimage'}>
                                    <img alt="myImg" src={folderIcon}/>{tile.myfileName}</a>
                                <svg onClick={() => {
                                    this.setState({});
                                    this.handleUnStar([{
                                        img: tile.img,
                                        cols: 2,
                                        myfileName: tile.myfileName,
                                        starred: tile.starred
                                    }])
                                }} width="32" height="32" className="playStarred">
                                    <path
                                        d="M16 20.95l-4.944 2.767 1.104-5.558L8 14.312l5.627-.667L16 8.5l2.373 5.145 5.627.667-4.16 3.847 1.104 5.558z">
                                    </path>
                                </svg>
                                <div className="download-button">
                                    <div>
                                        <div className="dropdown">
                                                <span className="bold dropdownOption" data-toggle="dropdown">
                                                    ...
                                                </span>

                                            <ul className="dropdown-menu">

                                                <li className={'ddleft'}><a onClick={() => {
                                                    this.handleDelete({"path_to_delete": tile.img})
                                                }}>Delete...</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <br/>
                                <div className="myStyle-main4">
                                    <hr/>
                                </div>
                            </div>
                        ))}
                        <div className="myStyle-main4">
                            <hr/>
                        </div>
                        <br/>
                        <div className="myStyle-main4">
                            <hr/>
                        </div>
                        <h5 className="myStyle-main2">Recent</h5>
                        <div className="myStyle-main4">
                        </div>
                        <div>
                            {
                                this.state.newfolder
                                    ? <NewFolder createFolder={this.createFolder}/>
                                    : null
                            }
                        </div>

                        <div>
                            {
                                this.state.newSharedfolder
                                    ? <NewSharedFolder createSharedFolder={this.createSharedFolder}/>
                                    : null
                            }
                        </div>

                        {
                            this.state.images.map(tile => (

                                <div className="imageGridStyle toggleVisibility" key={tile.img} cols={tile.cols || 1}>
                                    <br/>
                                    <a className="myStyle-main3">{tile.myfileName}</a>
                                    {
                                        tile.starred
                                            ? <svg onClick={() => {
                                                tile.starred = !tile.starred;
                                                this.setState({
                                                    imageStarred: !this.state.starredfile.starred
                                                });
                                                this.handleUnStar([{
                                                    img: tile.img,
                                                    cols: 2,
                                                    myfileName: tile.myfileName,
                                                    starred: tile.starred
                                                }])

                                            }} width="32" height="32" className="play">
                                                <path
                                                    d="M16 20.95l-4.944 2.767 1.104-5.558L8 14.312l5.627-.667L16 8.5l2.373 5.145 5.627.667-4.16 3.847 1.104 5.558z">
                                                </path>
                                            </svg>
                                            : <svg onClick={() => {
                                                tile.starred = !tile.starred;
                                                this.setState({
                                                    imageStarred: !this.state.starredfile.starred
                                                });
                                                this.handleStar([{
                                                    img: tile.img,
                                                    cols: 2,
                                                    myfileName: tile.myfileName,
                                                    starred: tile.starred
                                                }])
                                            }} width="32" height="32" className="play">
                                                <path
                                                    d="M20.944 23.717L16 20.949l-4.944 2.768 1.104-5.558L8 14.312l5.627-.667L16 8.5l2.373 5.145 5.627.667-4.16 3.847 1.104 5.558zM17.66 17.45l1.799-1.663-2.433-.289L16 13.275l-1.026 2.224-2.433.289 1.799 1.663-.478 2.403L16 18.657l2.138 1.197-.478-2.403z">
                                                </path>
                                            </svg>
                                    }
                                    <div className="download-button">


                                        <div className="dropdown ">
                                                <span className="bold dropdownOption" data-toggle="dropdown">
                                                    ...
                                                </span>

                                            <ul className="dropdown-menu">

                                                <li className={'ddleft'}><a onClick={() => {
                                                    this.handleDelete({"path_to_delete": tile.img})
                                                }}>Delete</a></li>
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="myStyle-main4">
                                        <hr/>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <div className="col-md-3">
                        <div className="maestro-nav__container">
                            <div className="maestro-nav__panel">
                                <button className="btn btn-danger logout" onClick={this.props.handleLogout}>Logout
                                </button>
                                <br/><br/>

                                <div className="maestro-nav__contents">
                                    <ul className="maestro-nav__products">
                                        <li>
                                            <label className="btn btn-primary navuploadButton">
                                                Upload Files<input type="file" hidden onChange={this.handleFileUpload}/>
                                            </label>
                                        </li><br></br>

                                        <a>
                                            <li data-reactid="20">
                                                <br/><span onClick={() => {
                                                this.setState({newfolder: !this.state.newfolder});
                                            }}> Create New Folder
                                        </span>

                                            </li>
                                            <li data-reactid="25">
                                                <br/><span onClick={() => {
                                                this.setState({newSharedfolder: !this.state.newSharedfolder});
                                            }}> New Shared Folder</span>
                                            </li>
                                        </a>

                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default FileList;

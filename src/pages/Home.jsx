import React, { useEffect } from 'react'
import { useState } from 'react'
import ax from '../ax';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css';
import axios from 'axios';
import { toBeChecked } from '@testing-library/jest-dom/dist/matchers';
import { v4 as uuidv4 } from 'uuid'; 


const Home = () => {

    const [box, setbox] = useState(false);
    const [option, setoption] = useState(false);
    const [update, setupdate] = useState(false);
    const [nextpage, setnextpage] = useState('');
    const [optionid, setoptionid] = useState('');
    const [url, seturl] = useState([]);
    const [id, setId] = useState('');

    //Error Status
    const [error, seterror] = useState([]);

    //Store Data
    const [store, setstore] = useState([]);

    //Update Data

    //Search Data
    const [search, setsearch] = useState('');
    
    //Form data
    const [petname, setpetname] = useState('');
    const [pawrent, setpawrent] = useState('');
    const [gender, setgender] = useState('');
    const [contact, setcontact] = useState('');
    const [city, setcity] = useState('');
    const [status, setstatus] = useState('');
    const [breed, setbreed] = useState('');
    const [time, settime] = useState('');
    const [address, setaddress] = useState('');
    const [township, settownship] = useState('');
    const [idcode, setidcode] = useState('');


    //Get Data From DataBase
    useEffect(() => {
        ax.get('sentdata').then(res => {
            console.log(res.data.data)
            setstore([...store, ...res.data.data.data])
            setnextpage(res.data.data.next_page_url)
            seturl(res.data.data.links)
       }) 
    },[])

    //Save
    const handlesave = () => {


        const newId = uuidv4();
        const obj = {
            id: newId,
            petname: petname,
            pawrent: pawrent,
            gender: gender,
            contact: contact,
            city: city,
            status: status,
            breed: breed,
            time: time,
            address: address,
            township:township   
        }
        setstore([obj, ...store])
        toast.success('Patient is successfully created!', {
            theme: "colored"
        });
    }

    //For show
     const handleadd = () => {
        setbox(!box)
    }

    //For Delete and Edit
    const handleoption = (id) => {
        console.log(id);
        setoptionid(id);
        if (store.map(i=>id.id === id)) {
            setoption(!option)
             console.log(id)
      }
       
    }

    //Update For Show
    const handleupdate = (id) => {
        setupdate(!update)
        let obj = {
            id:id,
        }
        // console.log(id);
        const data = store.find(i => i.id === id);
            setId(data.id)
            setpetname(data.petname)
            setpawrent(data.pawrent)
            setgender(data.gender)
            setcontact(data.contact)
            setcity(data.city)
            setstatus(data.status)
            setbreed(data.breed)
            settime(data.time)
            settownship(data.township)
            setaddress(data.address)
            setidcode(data.id_code)
    }

    
    // onst doubleupdate = (id) => {
    //     let actualElement = {
    //         id: id,
    //         text: edit,
    //     }
    //     setdata([{ id: id, ...actualElement }])
    //     setModalVisible(false);
    //     Toast.success('Successfully Updated!')
    // }

  
    const updatefinaldata = () => {
        const obj = {
            id: id,
            petname: petname,
            pawrent: pawrent,
            gender: gender,
            contact: contact,
            city: city,
            status: status,
            breed: breed,
            time: time,
            address: address,
            township: township
        }

        setstore([{ id: id, ...obj }])
        toast.success('Patient is successfully updated!', {
            theme: "colored"
        });
    };

    
    //Delete
    const handledelete = (id) => {
         let obj = {
            id:id
        }
        confirmAlert({
            title: 'Comfirmation',
            message: 'Are you sure you want to delete this patient?',
            buttons: [
                {
                    label: 'Yes',
                    color:'red',
                    onClick: () => {
                        setstore(store.filter(i => i.id !== id))
                            toast.success('Patient is successfully deleted!', {
                                theme: "colored"
                            });
                    }
                },
                {
                    label: 'No',
                    onClick: () => console.log('hello')
                }
            ]
        });
    }

    //Paginate
    const handleurl = () => {
        axios
            .get(nextpage).then((res) => {
                setstore([...store,...res.data.data.data]);
                setnextpage(res.data.data.next_page_url);
            });
    }

    //Search
    const handlesearch = () => {
        console.log(search);
        const formdata = new FormData();
        formdata.append('key', search);
        ax.post('searchkey',formdata ).then(res => {
            setstore(res.data.data)
        })
    }


    return (
        <>
            <div className="container-fluid bg">
                <div className="row p-2">
                    <div className="col-1">
                        <img src="image/logo(2).png" alt="" />
                    </div>
                    <div className="col-11">
                        <div className='float-end'>
                            <div className='d-flex me-4'>
                                <div>
                                    <img src="image/Notifications.png" className='me-4 pe-3 mt-3' alt="" />
                                </div>
                                <div className='d-flex'>
                                    <div>
                                        <img src="image/user image.png" className='mt-2 me-3' alt="" />
                                    </div>
                                    <div>
                                        <h6 className='other-font-one mt-3'>Lisa</h6>
                                        <h6 className='other-font-two'>Operator</h6>
                                    </div>
                                </div>
                            </div>
                       </div>
                    </div>
                </div>
            </div>

            <div className="container-fluid mt-4 pt-3 position-relative">
                <div className="row">
                    <div className="col-12">
                        <h6 className='heading ms-2'>Patient List</h6>
                    </div>
                    <div className="col-12 ">
                        <div className="row ">
                            <div className="col-3 ">
                                <div className='search-box position-relative'>
                                    <input type="text" onChange={(e) => setsearch(e.target.value)} className='input-search mt-1 ms-2' placeholder='Search table' />
                                    <img src="image/search.png" onClick={()=>handlesearch()} className='search-btn' alt="" />
                                </div>
                            </div>
                            <div className="col-9">
                                <button className='add-btn float-end me-4 ' onClick={()=>handleadd()}><img src="image/add.png" className='me-2 ms-2' alt="" /> Add new patient</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="row">
                            <div className="col-1">
                                <select name="" id="" className='select-form-one ms-2 mt-3'>
                                    <option value="">Status All</option>
                                </select>
                            </div>
                            <div className="col-1">
                                <select name="" id="" className='select-form-one ms-4 mt-3'>
                                    <option value="">Breed All</option>
                                </select>
                            </div>
                            <div className='col-10'>
                                <h6 className='float-end normal-font me-4 mt-3'>Rows per pages: <select name="" className='input-form-two' onChange={()=>handleurl()} id="">
                                    <option value="normal">N</option>
                                    <option value="all">All</option>
                                </select></h6>
                            </div>
                       </div>
                    </div>
                </div>

                <div className="row mt-3">
                    <div className="col-12">
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th><input type="checkbox" name="" id=""  /></th>
                                    <th>ID</th>
                                    <th>Pet Name</th>
                                    <th>Status</th>
                                    <th>Pawrent</th>
                                    <th>Breed</th>
                                    <th>Gender</th>
                                    <th>Date of Birth</th>
                                    <th>Contact Phone No.</th>
                                    <th>Address</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    store.map(item => {
                                        return (
                                            <tr className="position-relative" >
                                                <td><input type="checkbox" name="" id="" /></td>
                                                <td>{item.id_code }</td>
                                                <td>{ item.petname}</td>
                                                <td>
                                                    {item.status === 'food-allergy' ? <img src='image/allergy.png' /> : <img src='image/picky eater.png' />}
                                                </td>
                                                <td>{ item.pawrent}</td>
                                                <td>{ item.breed}</td>
                                                <td>{ item.gender}</td>
                                                <td>{ item.time}</td>
                                                <td>{ item.contact}</td>
                                                <td>{ item.address}</td>
                                                <td>
                                                    <img src="image/more.png" onClick={() => handleoption(item.id)} alt="" className='more-image' />
                                                    {
                                                        option === false ? '' : <>
                                                            {
                                                                optionid === item.id ? <>
                                                                    <div className='option-box shadow-lg p-2 rounded-2'>
                                                                        <button className='border-0 bg-white' onClick={() => handleupdate(item.id)}>
                                                                            <div className='d-flex mb-1'>
                                                                                <img src="image/edit.png" className='option-image ms-1' alt="" />
                                                                                <h6 className='option-text ms-3 me-5'>Edit</h6>
                                                                            </div>
                                                                        </button>
                                                                        <p className='under-line'></p>
                                                                        <button className='border-0 bg-white' onClick={() => handledelete(item.id)}>
                                                                            <div className='d-flex mt-2'>
                                                                                <img src="image/delete.png" className='option-image ms-1' alt="" />
                                                                                <h6 className='option-text ms-3 me-5 '>Delete</h6>
                                                                            </div>
                                                                        </button>
                                                                    </div>
                                                                </> : ''
                                                            }
                                                        </>
                                                    }
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>

               
                {
                    box === false ? '' : <>
                        <div className="col-5 offset-3 bg-white shadow-lg rounded-2 add-box">
                            <div className="row">
                                <div className="col-12 mt-4 ">
                                    <img src="image/output-onlinepngtools.png" onClick={() => handleadd()} className='float-end close-image me-4' alt="" />
                                </div>
                                <div className="col-12 mt-2">
                                    <h6 className='text-center mb-0 add-header'>Add new patient</h6>
                                    <p className='text-center add-sub mt-1'>Enter new patient information below</p>
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-6 ">
                                    <div className='box-position'>
                                        <div>
                                            <label htmlFor="" className='d-block label-name '>Pet Name</label>
                                            <input type="text" onChange={(e) => setpetname(e.target.value)} className={`label-form d-block ${error.petname ? petname ? '' : 'border-danger' : ''} `} />
                                            {
                                                petname ? '' : <> {
                                                    error.petname && <small className="text-sm  error-message text-danger">{error.petname}</small>
                                                }</>
                                           }
                                        </div>
                                        <div className='mt-3'>
                                            <label htmlFor="" className='d-block label-name '>Pawrent</label>
                                            <input type="text" onChange={(e) => setpawrent(e.target.value)} className={`label-form d-block ${error.pawrent ? pawrent ? '' : 'border-danger' : ''} `} />
                                            {
                                                pawrent ? '' : <> {
                                                    error.pawrent && <small className="text-sm  error-message text-danger">{error.pawrent}</small>
                                                }</>
                                            }
                                        </div>
                                        <div className='mt-3'>
                                            <label htmlFor="" className='d-block label-name '>Gender</label>
                                            <div className='d-flex'>
                                                <div className='d-flex'>  <input type="radio" value="male" className='radiocolor'   onChange={(e) => setgender(e.target.value)} id='male' name='gender' />
                                                    <h6 className='mt-2 ms-2 radio-text'>Male</h6></div>
                                                <div className='d-flex ms-4 ps-3'>  <input type="radio" className='radiocolor' value="female" onChange={(e) => setgender(e.target.value)} id='female' name='gender' />
                                                    <h6 className='mt-2 ms-2 radio-text'>Female</h6></div>
                                            </div>
                                            {
                                                gender ? '' : <> {
                                                    error.gender && <small className="text-sm  error-message text-danger">{error.gender}</small>
                                                }</>
                                            }
                                        </div>
                                        <div className='mt-3'>
                                            <label htmlFor="" className='d-block label-name '>Contact Phone No.</label>
                                            <input type="text" onChange={(e) => setcontact(e.target.value)} className={`label-form d-block ${error.contact ? contact ? '' : 'border-danger' : ''} `} />
                                            {
                                                contact ? '' : <> {
                                                    error.contact && <small className="text-sm  error-message text-danger">{error.contact}</small>
                                                }</>
                                            }
                                        </div>
                                        <div className='mt-3'>
                                            <label htmlFor="" className='d-block label-name '>City</label>
                                            <select name="" id="" onChange={(e) => setcity(e.target.value)} className={`label-select-form d-block ${error.city ? city ? '' : 'border-danger' : ''} `}>
                                                <option value="">please choose city</option>
                                                <option value="yangon">Yangon</option>
                                                <option value="mandalay">Mandalay</option>
                                                <option value="naypyitaw">Nay Pyi Taw</option>
                                            </select>
                                            {
                                                city ? '' : <> {
                                                    error.city && <small className="text-sm  error-message text-danger">{error.city}</small>
                                                }</>
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className="col-6 ">
                                    <div className='text-center box-position-two'>
                                        <div className=''>
                                            <label htmlFor="" className='d-block label-name '>Status</label>
                                            <select name="" id="" onChange={(e) => setstatus(e.target.value)} className={`label-select-form d-block ${error.status ? status ? '' : 'border-danger' : ''} `}>
                                                <option value="">please choose status</option>
                                                <option value="food-allergy">Food Allergy</option>
                                                <option value="picky-eater">Picky Eater</option>
                                            </select>
                                            {
                                                status ? '' : <> {
                                                    error.status && <small className="text-sm  error-message text-danger">{error.status}</small>
                                                }</>
                                            }
                                        </div>
                                        <div className='mt-3'>
                                            <label htmlFor="" className='d-block label-name '>Breed</label>
                                            <select name="" id="" onChange={(e) => setbreed(e.target.value)} className={`label-select-form d-block ${error.breed ? breed ? '' : 'border-danger' : ''} `}>
                                                <option value="">please choose status</option>
                                                <option value="begale">Beagle</option>
                                                <option value="spaniel">Spaniel</option>
                                                <option value="golden-retriver">Golden Retriever</option>
                                            </select>
                                            {
                                                breed ? '' : <> {
                                                    error.breed && <small className="text-sm  error-message text-danger">{error.breed}</small>
                                                }</>
                                            }
                                        </div>
                                        <div className='mt-3'>
                                            <label htmlFor="" className='d-block label-name '>Date of Birth</label>
                                            <input type="date" name="" onChange={(e) => settime(e.target.value)} id="" className={`label-select-form d-block ${error.time ? time ? '' : 'border-danger' : ''} `} />
                                            {
                                                time ? '' : <> {
                                                    error.time && <small className="text-sm  error-message text-danger">{error.time}</small>
                                                }</>
                                            }
                                        </div>
                                        <div className='mt-3'>
                                            <label htmlFor="" className='d-block label-name '>Address</label>
                                            <input type="text" onChange={(e) => setaddress(e.target.value)} className={`label-form d-block ${error.address ? address ? '' : 'border-danger' : ''} `} />
                                            {
                                                address ? '' : <> {
                                                    error.address && <small className="text-sm  error-message text-danger">{error.address}</small>
                                                }</>
                                            }
                                        </div>
                                        <div className='mt-3'>
                                            <label htmlFor="" className='d-block label-name '>Township</label>
                                            <select name="" id="" onChange={(e) => settownship(e.target.value)} className={`label-select-form d-block ${error.township ? township ? '' : 'border-danger' : ''} `}>
                                                <option value="">please choose township</option>
                                                <option value="hlaing">Hlaing</option>
                                                <option value="sankyaung">San Kyaung</option>
                                                <option value="kamaryut">Ka Mar Yut</option>
                                                <option value="mingalardon">Mingalardon</option>
                                                <option value="htauk-kyant">Htauk-Kyant</option>
                                                <option value="hlegu">Hlegu</option>
                                            </select>
                                            {
                                                township ? '' : <> {
                                                    error.township && <small className="text-sm  error-message text-danger">{error.township}</small>
                                                }</>
                                            }
                                        </div>
                                    </div>
                                </div>

                            </div>

                            
                            <div className="row justify-content-center my-4">
                                <div className="col-12">
                                    <div className='text-center'>
                                        <button onClick={()=>handlesave()} className='save-btn'>Save</button>
                                        <button className='cancel-btn ms-2' onClick={() => handleadd()}>Cancel</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                }

                {
                    update === false ? '' : <>
                        <div className="col-5 offset-3 bg-white shadow-lg rounded-2 add-box">
                            <div className="row">
                                <div className="col-12 mt-4 ">
                                    <img src="image/output-onlinepngtools.png" onClick={() => handleupdate()} className='float-end close-image me-4' alt="" />
                                </div>
                                <div className="col-12 mt-2">
                                    <h6 className='text-center mb-0 add-header'>Update patient</h6>
                                    <p className='text-center add-sub mt-1'>Enter new patient information below</p>
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-6 ">
                                    <div className='box-position'>
                                        <div>
                                            <label htmlFor="" className='d-block label-name '>Pet Name</label>
                                            <input type="text" onChange={(e) => setpetname(e.target.value)} value={petname} className={`label-form d-block`} />
                                        </div>
                                        <div className='mt-3'>
                                            <label htmlFor="" className='d-block label-name '>Pawrent</label>
                                            <input type="text" onChange={(e) => setpawrent(e.target.value)} className={`label-form d-block  `} value={pawrent} />
                                        </div>
                                        <div className='mt-3'>
                                            <label htmlFor="" className='d-block label-name '>Gender</label>
                                            <div className='d-flex'>
                                                {
                                                    gender === 'male' ? <>
                                                        <div className='d-flex'>  <input type="radio" value='male' checked className='radiocolor' onChange={(e) => setgender(e.target.value)} id='male' name='gender' />
                                                            <h6 className='mt-2 ms-2 radio-text'>Male</h6></div>
                                                    </> : <>
                                                            <div className='d-flex'>  <input type="radio" value='male'  className='radiocolor' onChange={(e) => setgender(e.target.value)} id='male' name='gender' />
                                                                <h6 className='mt-2 ms-2 radio-text'>Male</h6></div>
                                                        </>
                                                }
                                                {
                                                    gender === 'female' ? <>
                                                        <div className='d-flex ms-4 ps-3'>  <input type="radio" className='radiocolor'  checked  value="female" onChange={(e) => setgender(e.target.value)} id='female' name='gender' />
                                                            <h6 className='mt-2 ms-2 radio-text'>Female</h6></div>
                                                    </> : <>
                                                            <div className='d-flex ms-4 ps-3'>  <input type="radio" className='radiocolor' value="female" onChange={(e) => setgender(e.target.value)} id='female' name='gender' />
                                                                <h6 className='mt-2 ms-2 radio-text'>Female</h6></div>
                                                        </>
                                                }
                                            </div>
                                            {
                                                error.gender && <small className="text-sm  error-message text-danger">{error.gender}</small>
                                            }
                                        </div>
                                        <div className='mt-3'>
                                            <label htmlFor="" className='d-block label-name '>Contact Phone No.</label>
                                            <input type="text" onChange={(e) => setcontact(e.target.value)} className={`label-form d-block`} value={contact} />
                                        </div>
                                        <div className='mt-3'>
                                            <label htmlFor="" className='d-block label-name '>City</label>
                                            <select name="" id="" onChange={(e) => setcity(e.target.value)} className={`label-select-form d-block ${error.contact ? 'border-danger' : ''} `} value={city}>
                                                <option value="">please choose city</option>
                                                <option value="yangon">Yangon</option>
                                                <option value="mandalay">Mandalay</option>
                                                <option value="naypyitaw">Nay Pyi Taw</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-6 ">
                                    <div className='text-center box-position-two'>
                                        <div className=''>
                                            <label htmlFor="" className='d-block label-name '>Status</label>
                                            <select name="" id="" onChange={(e) => setstatus(e.target.value)} className={`label-select-form d-block ${error.status ? 'border-danger' : ''} `} value={status}>
                                                <option value="">please choose status</option>
                                                <option value="food-allergy">Food Allergy</option>
                                                <option value="picky-eater">Picky Eater</option>
                                            </select>
                                            {
                                                error.status && <small className="text-sm text-start  error-message text-danger">{error.status}</small>
                                            }
                                        </div>
                                        <div className='mt-3'>
                                            <label htmlFor="" className='d-block label-name '>Breed</label>
                                            <select name="" id="" onChange={(e) => setbreed(e.target.value)} className={`label-select-form d-block ${error.breed ? 'border-danger' : ''} `} value={breed} >
                                                <option value="">please choose status</option>
                                                <option value="begale">Beagle</option>
                                                <option value="spaniel">Spaniel</option>
                                                <option value="golden-retriver">Golden Retriever</option>
                                            </select>
                                            {
                                                error.breed && <small className="text-sm error-message text-danger">{error.breed}</small>
                                            }
                                        </div>
                                        <div className='mt-3'>
                                            <label htmlFor="" className='d-block label-name '>Date of Birth</label>
                                            <input type="date" name="" onChange={(e) => settime(e.target.value)} id="" className={`label-select-form d-block`} value={time} />
                                        </div>


                                        <div className='mt-3'>
                                            <label htmlFor="" className='d-block label-name '>Address</label>
                                            <input type="text" onChange={(e) => setaddress(e.target.value)} className={`label-form d-block`} value={address} />
                                        </div>

                                        <div className='mt-3'>
                                            <label htmlFor="" className='d-block label-name '>Township</label>
                                            <select name="" id="" onChange={(e) => settownship(e.target.value)} className={`label-select-form d-block`} value={township}>
                                                <option value="">please choose township</option>
                                                <option value="hlaing">Hlaing</option>
                                                <option value="sankyaung">San Kyaung</option>
                                                <option value="kamaryut">Ka Mar Yut</option>
                                                <option value="mingalardon">Mingalardon</option>
                                                <option value="htauk-kyant">Htauk-Kyant</option>
                                                <option value="hlegu">Hlegu</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <input type="hidden" value={idcode} />


                            <div className="row justify-content-center my-4">
                                <div className="col-12">
                                    <div className='text-center'>
                                        <button onClick={() => updatefinaldata()} className='update-btn'>Update</button>
                                        <button className='cancel-btn ms-2' onClick={() => handleupdate()}>Cancel</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                }
                <ToastContainer position={toast.POSITION.BOTTOM_LEFT} />
              </div>
        </>
    )
}

export default Home
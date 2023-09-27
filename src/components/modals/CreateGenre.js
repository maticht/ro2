import React, {useContext, useEffect, useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import {
    createGenre,
    deleteGenre,
    getAllGenres,
} from "../../http/radioApi";
import {Context} from "../../index";

const CreateGenre = ({show, onHide}) => {
    const {radioStation} = useContext(Context);
    const [genres, setGenres] = useState([])

    useEffect(() => {
        getAllGenres().then(data => {
            radioStation.setGenres(data)
            setGenres(data)
        });
    }, [])

    const [value, setValue] = useState('')
    const addGenre = async () => {
        await createGenre({name: value}).then(data => {
            if (data.status === 409){
                alert(data.message)
            }
            setValue('')
        });
        await getAllGenres().then(data => {
            radioStation.setGenres(data)
            setGenres(data)
        });
    }

    const handleDeleteGenre = (id) => {
        deleteGenre({id:id});
        setGenres(genres.filter((genre)=> genre.id!==id));
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
        >
            <Modal.Header closeButton  style={{backgroundColor:'#F4F4F4'}}>
                <Modal.Title id="contained-modal-title-vcenter"  style={{fontSize:'20px', fontWeight:'bold'}}>
                    Жанры
                </Modal.Title>
            </Modal.Header>
            <Modal.Body  style={{backgroundColor:'#F4F4F4'}}>
                <div style={{width:'100%', display:'flex', justifyContent:'flex-start', flexDirection:'row', alignItems:'center', flexWrap:'wrap'}}>
                    {genres.map(genre => <div
                        key={genre.id}
                        style={{
                            display: 'flex', alignItems: 'center', marginBottom: '10px',backgroundColor:'#fff', padding:"5px 10px", marginRight:'10px', borderRadius:'10px'
                        }}
                    >
                        <p style={{margin: '0px'}}>{genre.name}</p>
                        <span
                            style={{cursor: 'pointer', color: '#666', marginLeft: '5px'}}
                            onClick={() => handleDeleteGenre(genre.id)}
                        >
                    &times;
                    </span>
                    </div>)}
                </div>
                <Modal.Title id="contained-modal-title-vcenter" style={{margin:"10px 0 15px 0", fontSize:'18px', fontWeight:'bold'}}>
                    Добавить жанр
                </Modal.Title>
                <Form>
                    <Form.Control
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        placeholder={"Введите название жанра"}
                        style={{backgroundColor:'#fff', outline:'none', border:'0', height:'42px', borderRadius:'10px'}}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer  style={{backgroundColor:'#F4F4F4', width:'100%', justifyContent:'space-between'}}>
                <Button variant={"outline-danger"} className='admin-additional-button' onClick={onHide}>Закрыть</Button>
                <Button variant={"outline-success"} className='main-admin-button' onClick={addGenre}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateGenre;

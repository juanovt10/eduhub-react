import React, { useState } from 'react';
import { Card, Row, Col, Image, Button, Modal, ModalBody } from 'react-bootstrap';
import Avatar from '../../components/Avatar';
import { useCurrentUser } from '../../context/CurrentUserContext';
import CreateProfileForm from './CreateProfileForm';
import ProfileDelete from './ProfileDelete';
import styles from "../../styles/Profile.module.css";
import Dropdown from '../../components/Dropdown';
import { Sheet } from "../../@/components/ui/sheet";


const Profile = ({fetchProfileData, ...props}) => {
    const {
        id,
        owner,
        created_at,
        name,
        bio,
        dob,
        image,
        is_instructor,
        enrollments_count,
        ratings_count,
        wish_list_count,
    } = props

    const [showSheet, setShowSheet] = useState({
        showEditSheet: false,
        showDeleteSheet: false
    })

    const handleSheetDisplay = (sheetType, bool) => {
        setShowSheet((prevSheet) => ({
            ...prevSheet,
            [sheetType]: bool,
        }))
    }

    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner;
    

    return (
        <>
            <Card className={styles.CompactCard}>
                <Row>
                    {is_instructor ? (
                        <Col className='text-left'>
                            <i class="fa-solid fa-graduation-cap"></i>
                        </Col>
                    ) : (
                        is_owner && (
                            <Col className='text-left'>
                                {/* Need to add functionality */}
                                <Button><i class="fa-solid fa-graduation-cap"></i></Button> 
                            </Col>
                        )
                    )}
                    {is_owner && (
                        <Col className='text-right'>
                            <Dropdown
                                handleSelect={handleSheetDisplay}
                                actionTypes={['showEditSheet', 'showDeleteSheet']}
                                entity='profile'
                            />


                            <CreateProfileForm 
                                open={showSheet.showEditSheet}
                                onOpenChange={setShowSheet}
                                mode='edit'
                                fetchProfileData={fetchProfileData}
                                onHide={() => handleSheetDisplay('showEditSheet', false)}
                            />

                            <Sheet open={showSheet.showEditSheet} onOpenChange={setShowSheet}>

                            </Sheet>
                            <Sheet open={showSheet.showDeleteSheet} onOpenChange={setShowSheet}>
                                <ProfileDelete 
                                    onHide={() => handleSheetDisplay('showDeleteSheet', false)}
                                    id={id}
                                />
                            </Sheet>
                        </Col>
                    )}
                </Row>
                <Row className='my-3'>
                    <Avatar
                        src={image}
                        height={70}
                        text={`@${owner}`}
                    />
                </Row>
                <Row>
                    <Col className='text-center'>
                        <h4>{name}</h4>
                    </Col>
                </Row>

                <div className={`my-3 ${styles.dataContainer}`}>
                    <div>
                        <strong>{enrollments_count}</strong>
                        <strong>Enrollments</strong>
                    </div>

                    <div>
                        <strong>{ratings_count}</strong>
                        <strong>Reviews</strong>
                    </div>
                    <div>
                        <strong>{wish_list_count}</strong>
                        <strong>Wish List</strong>
                    </div>
                </div>

                <Row>
                    <Col>
                        {/* <p className='text-justify'>{bio}</p> */}
                        <p className='text-justify'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Dui nunc mattis enim ut tellus. Pharetra sit amet aliquam id. Dictum non consectetur a erat. Pulvinar mattis nunc sed blandit libero.</p>
                    </Col>
                </Row>
                <Row className="mt-3">
                    <Col>
                        Joined Eduhub on: {created_at}
                    </Col>
                </Row>
            </Card>


            {/* <Modal show={showModal.showEditModal} onHide={() => handleModalDisplay('showEditModal', false)}>
                <Modal.Header>
                    <Modal.Title>Edit profile? {name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <CreateProfileForm
                        mode='edit'
                        fetchProfileData={fetchProfileData}
                        onHide={() => handleModalDisplay('showEditModal', false)}
                    />
                </Modal.Body>
            </Modal>
            <Modal show={showModal.showDeleteModal} onHide={() => handleModalDisplay('showDeleteModal', false)}>
               <ProfileDelete
                    onHide={() => handleModalDisplay('showDeleteModal', false)}
                    id={id}
                />
            </Modal> */}
        </>
    )
}

export default Profile
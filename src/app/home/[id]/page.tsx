'use client'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import badmintonInfo from '../../../image/badminton-info.png'
import Image from 'next/image'
import { Button, Input, Modal, ModalContent } from '@nextui-org/react'
import { BiDownArrow } from 'react-icons/bi'
import TeamPlayNow from './TeamPlayNow'
import versusImage from '../../../image/versus-image.png'
import { NowPlayer } from './model'
import { RiContactsBook3Line } from 'react-icons/ri'

type Param = {
    id?: string
}

const Homepage = (props: Param) => {
    const { id } = useParams()
    const [userName, setUserName] = useState<any>()
    let userInfo = JSON.parse(sessionStorage.getItem('userInfo') || '')
    const [teamOnePlaying,setTeamOnePlaying] = useState<NowPlayer>()
    const [teamTwoPlaying,setTeamTwoPlaying] = useState<NowPlayer>()
    const [awaitingTeamList, setAwaitingTeamList] = useState<NowPlayer[]>([])
    const [isVisibleModal, setIsVisibleModal] = useState<boolean>(false)
    const [userOne, setUserOne] = useState<string>()
    const [userTwo, setUserTwo] = useState<string>() 

    return (
        <div style={{ backgroundColor: '#fbfbfb'}}>
            <div className="header-containner grid grid-cols-3 pt-5">
                <div className="grid grid-gaps-4 grid-rows-2 p-5">
                    <span className='content-end'>Course</span>
                    <span className='content-start'>สนามที่ <span className='ml-3' style={{ color: '#fff', fontSize: 28, fontWeight: 'bold' }}>1</span></span>
                </div>
                <div className="content-end justify-self-center">
                    {/* <Button isIconOnly color="primary" aria-label="Like" variant='light'>
                        <BiDownArrow />
                    </Button> */}
                </div>
                <div className="content-end justify-end">
                    <Image src={badmintonInfo} alt="badminton-info" />
                </div>
            </div>
            <div style={{padding: '10px 20px'}}>
                <p>กำลังเล่น...</p>
                <div className="container-playing-team grid grid-rows-3 mt-2">
                    <TeamPlayNow/>
                    <div className='grid justify-center'>
                       <Image alt='versus-image' src={versusImage}/> 
                    </div>
                    <TeamPlayNow/>
                </div>
                <div className="grid grid-cols-2 mt-2">
                 <p>ลำดับทีม</p>
                 <p style={{textAlign:'end'}}>จำนวน {2} คู่</p>
                </div>
                <div className="awaiting-team-containner">
                    <p>Hello</p>
                </div>
                <div className="flex flex-row">
                   <Button variant='solid' className='button-primary basis-1/2' onClick={() => {setIsVisibleModal(true)}}>เพิ่มทีมใหม่</Button>
                   <Button isDisabled variant='bordered' className='button-default basis-1/2'>จัดการทีม</Button>
                </div>
               
            </div>

            <Modal
                isOpen={isVisibleModal}
                placement="center"
                onClose={() => setIsVisibleModal(false)}
                hideCloseButton={true}
            >
                <ModalContent>
                    <div>
                        <h2 style={{ margin: 20, textAlign: 'center' }}>เพิ่มทีม</h2>
                        <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 px-2">
                            {/* <Input
                                type="text"
                                // label="Email"
                                placeholder="เบอร์โทรศัพท์"
                                labelPlacement="outside"
                                startContent={
                                    <RiContactsBook3Line />
                                }
                                isRequired
                            />
                            <Input
                                // label="Password"
                                placeholder="Enter your password"
                                endContent={
                                    <button className="focus:outline-none" type="button" onClick={() => setisPasswordVisible(!isPasswordVisible)} aria-label="toggle password visibility">
                                        {isPasswordVisible ? (
                                            <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                        ) : (
                                            <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                        )}
                                    </button>
                                }
                                startContent={<RiLock2Fill/>}
                                type={isPasswordVisible ? "text" : "password"}
                                
                            /> */}
                            <Input
                                type="text"
                                // label="Email"
                                placeholder="ชื่อผู้เล่นคนที่ 1"
                                labelPlacement="outside"
                                startContent={
                                    <RiContactsBook3Line />
                                }
                                isRequired
                                value={userOne}
                                onChange={(e) => {setUserOne(e.target.value)}}
                            />
                            <Input
                                type="text"
                                // label="Email"
                                placeholder="ชื่อผู้เล่นคนที่ 2"
                                labelPlacement="outside"
                                startContent={
                                    <RiContactsBook3Line />
                                }
                                isRequired
                                value={userTwo}
                                onChange={(e) => {setUserTwo(e.target.value)}}
                            />
                            <Button variant='solid' size="md" className="button-primary" >ยืนยัน</Button>
                        </div>
                        
                        <br />
                    </div>

                </ModalContent>
            </Modal>
        </div>
    )
}

export default Homepage
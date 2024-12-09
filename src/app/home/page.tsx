"use client";
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import badmintonInfo from '../../image/badminton-info.png'
import Image from 'next/image'
import { Button, Divider, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input, Modal, ModalBody, ModalContent, ModalHeader, Popover, PopoverContent, PopoverTrigger, Spinner } from '@nextui-org/react'
import TeamPlayNow from './TeamPlayNow'
import versusImage from '../../image/versus-image.png'
import { ListAllPlayer, PlayerTeam } from './model'
import { RiContactsBook3Line } from 'react-icons/ri'
import emptyPlayerList from '../../image/emptyPlayerList.png'
import { AddNewTeam, DeleteAllData, DeleteTeam, GetdataListQueues, UpdateTeamData, UpdateTeamWin } from './service'
import { CgMoreVerticalAlt } from 'react-icons/cg';
import { FiEdit } from 'react-icons/fi';
import { FaSignOutAlt } from 'react-icons/fa';

import { FaArrowDown } from 'react-icons/fa6';

const Homepage = () => {
    const router = useRouter()
    const [teamOnePlaying, setTeamOnePlaying] = useState<PlayerTeam>()
    const [teamTwoPlaying, setTeamTwoPlaying] = useState<PlayerTeam>()
    const [awaitingTeamList, setAwaitingTeamList] = useState<PlayerTeam[]>([])
    const [isVisibleModal, setIsVisibleModal] = useState<boolean>(false)
    const [userOne, setUserOne] = useState<string>('')
    const [userTwo, setUserTwo] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const isLogin = typeof window !== "undefined" ? window.sessionStorage.userInfo ? JSON.parse(window.sessionStorage.userInfo) : router.push('/') : router.push('/')
    const [iseditUser, setIsEditUser] = useState<PlayerTeam | undefined>()
    const [isVisibleModalDelete, setIsVisibleModalDelete] = useState<boolean>(false)
    const [courtId, setCourtId] = useState<number>(3)
    const [isPlayedTwoRound,setIsPlayedTwoRound] = useState<boolean>(true)

    useEffect(() => {
        setIsLoading(true)
        GetdataListQueues(courtId).then((res: ListAllPlayer) => {
            console.log(res);
            
            setTeamOnePlaying(res.teamOnePlay)
            setTeamTwoPlaying(res.teamTwoPlay)
            setAwaitingTeamList(res.teamQueueList || [])
        }).finally(() => setIsLoading(false))
    }, [courtId])

    // const getDataList = () => {
    //     GetdataListQueues().then((res: ListAllPlayer) => {
    //         setTeamOnePlaying(res.teamOnePlay)
    //         setTeamTwoPlaying(res.teamTwoPlay)
    //         setAwaitingTeamList(res.teamQueueList || [])
    //     }).finally(() => setIsLoading(false))
    // }

    const handleSubmitTeam = () => {
        if (userOne?.trim() && userTwo?.trim()) {
            const convertData: PlayerTeam = {
                firstPlayer: userOne,
                secondPlayer: userTwo,
                update_by: isLogin.name,
                courtId: courtId
            }
            setIsLoading(true)
            setIsVisibleModal(false)
            if (iseditUser) {
                UpdateTeamData(iseditUser.id!!, courtId, convertData).then((res: ListAllPlayer) => {
                    setTeamOnePlaying(res.teamOnePlay)
                    setTeamTwoPlaying(res.teamTwoPlay)
                    setAwaitingTeamList(res.teamQueueList || [])
                    setUserOne('')
                    setUserTwo('')
                }).finally(() => setIsLoading(false))
            } else {
                AddNewTeam(convertData).then((res: ListAllPlayer) => {
                    setTeamOnePlaying(res.teamOnePlay)
                    setTeamTwoPlaying(res.teamTwoPlay)
                    setAwaitingTeamList(res.teamQueueList || [])
                    setUserOne('')
                    setUserTwo('')
                }).finally(() => setIsLoading(false))
            }
        }
    }
    const handleCountWin = (id: string, winCount: number) => {
        const data = {
            winCount: winCount + 1,
            update_by: isLogin.name
        }
        setIsLoading(true)
        UpdateTeamWin(id, isPlayedTwoRound, courtId, data).then((res: ListAllPlayer) => {
            setTeamOnePlaying(res.teamOnePlay)
            setTeamTwoPlaying(res.teamTwoPlay)
            setAwaitingTeamList(res.teamQueueList || [])
        }).finally(() => setIsLoading(false))
    }

    const handleDeleteTeam = () => {
        setIsLoading(true)
        DeleteTeam(iseditUser?.id!!, courtId).then((res) => {
            setTeamOnePlaying(res.teamOnePlay)
            setTeamTwoPlaying(res.teamTwoPlay)
            setAwaitingTeamList(res.teamQueueList || [])
        }).finally(() => setIsLoading(false))
        setIsVisibleModalDelete(false)
    }

    const deleteAllData = () => {
        setIsLoading(true)
        DeleteAllData(courtId).then((res) => {
            setTeamOnePlaying(res.teamOnePlay)
            setTeamTwoPlaying(res.teamTwoPlay)
            setAwaitingTeamList(res.teamQueueList || [])
        }).finally(() => setIsLoading(false))
    }

    const handleEditData = (teamData: PlayerTeam) => {
        setIsEditUser(teamData)
        setUserOne(teamData.firstPlayer)
        setUserTwo(teamData.secondPlayer)
        setIsVisibleModal(true)
    }

    const handleCloseModalAdd = () => {
        setIsVisibleModal(false)
        setIsEditUser(undefined)
        setUserOne('')
        setUserTwo('')
        setIsVisibleModalDelete(false)
    }

    const handleDeleteData = (teamData: PlayerTeam) => {
        setIsEditUser(teamData)
        setIsVisibleModalDelete(true)
    }

    return (
        <> {isLogin ? <div style={{ backgroundColor: '#fbfbfb' }}>
            <div className="header-containner grid grid-cols-2">
                <div className="grid grid-gaps-4 grid-rows-2 px-5 py-2">
                    <h2 className='content-end'>Course</h2>
                    <h3 className='content-start'>สนามที่ <span className='ml-3' style={{ color: '#fff', fontSize: 42, fontWeight: 'bold' }}>{courtId}</span></h3>
                </div>
                <div className="content-end justify-end">
                    <Image src={badmintonInfo} alt="badminton-info" />
                </div>
            </div>
            <div className="grid content-end justify-center" style={{ marginTop: '-30px' }}>
                <Dropdown placement="bottom" >
                    <DropdownTrigger>
                        <Button isIconOnly variant='solid' style={{ borderRadius: '100%', backgroundColor: 'white' }}>
                            <FaArrowDown color='var(--primary-color)' fontSize={20} />
                        </Button>
                    </DropdownTrigger>
                    <DropdownMenu
                        disallowEmptySelection
                        selectionMode="single"
                        onSelectionChange={(value) => setCourtId(Number(value.currentKey))}
                        style={{width: '40vh'}}
                    >
                        <DropdownItem key={1} className="text-danger" color='default' isDisabled>
                            <p className='basis-6/8 mr-10'>สนามที่ 1 </p>
                        </DropdownItem>
                        <DropdownItem key={2} className="text-danger" color='default' isDisabled>
                            <p className='basis-6/8 mr-10'>สนามที่ 2 </p>
                        </DropdownItem>
                        <DropdownItem key={3} className="text-danger" color='default'>
                            <p className='basis-6/8 mr-10'>สนามที่ 3 </p>
                        </DropdownItem>
                        <DropdownItem key={4} className="text-danger" color='default' >
                            <p className='basis-6/8 mr-10'>สนามที่ 4 </p>
                        </DropdownItem>
                        <DropdownItem key={5} className="text-danger" color='default' >
                            <p className='basis-6/8 mr-10'>สนามที่ 5 </p>
                        </DropdownItem>
                        <DropdownItem key={6} className="text-danger" color='default' >
                            <p className='basis-6/8 mr-10'>สนามที่ 6 </p>
                        </DropdownItem>
                        <DropdownItem key={7} className="text-danger" color='default' >
                            <p className='basis-6/8 mr-10'>สนามที่ 7 </p>
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>
            <div style={{ padding: '0px 20px' }}>
                
                {isLogin.name === `admin-bad-court-${courtId}` ? <div className='flex'>
                    <Button className={`basis1/2 ${isPlayedTwoRound ? 'button-primary' : 'button-default'}`} onClick={() => setIsPlayedTwoRound(true)}>เล่นแบบ 2 เกมออก</Button>
                    <Button className={`basis1/2 ${!isPlayedTwoRound ? 'button-primary' : 'button-default'}`} onClick={() => setIsPlayedTwoRound(false)}>เล่นแบบ 1 เกมออก</Button>
                </div>
                : <p>กำลังเล่น...</p>}
                <div className="container-playing-team grid grid-rows-3 mt-2">
                    {isLoading
                        ? <><div /><div className='grid content-center'>
                            <Spinner label='โปรดรอสักครู่...' />
                        </div></>
                        : <>
                            <TeamPlayNow isVisible={isLogin.name === `admin-bad-court-${courtId}`} teamInfo={teamOnePlaying} handleClickWin={handleCountWin} disabledButton={awaitingTeamList.length < 2} isPlayedTwoRound={isPlayedTwoRound} />
                            <div className='grid justify-center'>
                                <Image alt='versus-image' src={versusImage} />
                            </div>
                            <TeamPlayNow isVisible={isLogin.name === `admin-bad-court-${courtId}`} teamInfo={teamTwoPlaying} handleClickWin={handleCountWin} disabledButton={awaitingTeamList.length < 2} isPlayedTwoRound={isPlayedTwoRound} />
                        </>}
                </div>
                <div className="grid grid-cols-2 mt-2">
                    <p>ลำดับทีม</p>
                    <p style={{ textAlign: 'end' }}>จำนวน {awaitingTeamList.length} คู่</p>
                </div>
                <div className="awaiting-team-containner">
                    {isLoading ? <div className='grid content-center justify-center' style={{ height: '100%' }}>
                        <Spinner label='โปรดรอสักครู่...' />
                    </div> : awaitingTeamList.length ? awaitingTeamList.map((it, idx) => {
                        return <div key={it.id}>
                            <div className='flex flex-row my-1'>
                                <div className='basis-6 grid content-center'>
                                    <p>{idx + 1}</p>
                                </div>
                                <div className='basis-5/6'>
                                    <p>ทีมของ : </p>
                                    <h4>{it.firstPlayer} - {it.secondPlayer}</h4>
                                </div>
                                <div className='basis-4 grid content-center' style={{ textAlign: 'end' }}>
                                    {isLogin.name === `admin-bad-court-${courtId}` ?
                                        <Dropdown placement="bottom-end" >
                                            <DropdownTrigger>
                                                <Button isIconOnly variant='bordered'>
                                                    {/* <MdDeleteOutline fontSize={24} /> */}
                                                    <CgMoreVerticalAlt fontSize={24} color='var(--primary-color)' />
                                                </Button>
                                            </DropdownTrigger>
                                            <DropdownMenu aria-label="Static Actions">
                                                <DropdownItem onClick={() => handleEditData(it)}
                                                    endContent={<FiEdit className='basis-2/8 ' fontSize={14} />}>
                                                    <p className='basis-6/8 mr-10'>แก้ไขข้อมูล</p>
                                                </DropdownItem>
                                                <DropdownItem key="delete" className="text-danger" color="danger" onClick={() => handleDeleteData(it)}
                                                    endContent={<FaSignOutAlt className='basis-2/8' fontSize={14} />}>
                                                    <p className='basis-6/8 mr-10'>ออกจากคิว</p>
                                                </DropdownItem>
                                            </DropdownMenu>
                                        </Dropdown> : null}
                                </div>
                            </div>
                            <Divider />
                        </div>
                    }) : <div className='grid content-center justify-center' style={{ height: '100%' }}>
                        <Image src={emptyPlayerList} alt='empty player list' />
                        <span className='my-5' style={{ textAlign: 'center' }}>ไม่มีทีมต่อคิว</span>
                    </div>}
                </div>
                <div className="flex flex-row">
                    <Button variant='solid' className='button-primary basis-2/2' onClick={() => { setIsVisibleModal(true); setIsEditUser(undefined); }}>เพิ่มทีมใหม่</Button>
                    {isLogin.name === `admin-bad-court-${courtId}` ? <Button variant='bordered' className='button-default basis-2/2' onClick={deleteAllData}> Clear Data</Button> : null}
                </div>

            </div>

            <Modal
                isOpen={isVisibleModal}
                placement="center"
                onClose={handleCloseModalAdd}
                hideCloseButton={true}
            >
                <ModalContent>
                    <div>
                        <h2 style={{ margin: 20, textAlign: 'center' }}>{iseditUser ? "แก้ไขข้อมูลทีม" : "เพิ่มทีม"}</h2>
                        <div className="flex w-full flex-wrap mb-6 md:mb-0 gap-4 px-2">
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
                                onChange={(e) => { setUserOne(e.target.value) }}
                                errorMessage="กรุณากรอก ชื่อผู้เล่นคนที่ 1 "
                                isInvalid={!userOne}
                                className='basis-full'
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
                                onChange={(e) => { setUserTwo(e.target.value) }}
                                errorMessage="กรุณากรอก ชื่อผู้เล่นคนที่ 2 "
                                isInvalid={!userTwo}
                                className='basis-full'
                            />
                            <Button variant='solid' size="md" className="button-primary basis-full" onClick={handleSubmitTeam}>ยืนยัน</Button>
                        </div>

                        <br />
                    </div>

                </ModalContent>
            </Modal>
            <Modal
                isOpen={isVisibleModalDelete}
                placement="center"
                onClose={handleCloseModalAdd}
                hideCloseButton={true}
            >
                <ModalContent>
                    <div>
                        <ModalHeader className="flex gap-1 content-center"> <FaSignOutAlt fontSize={36} color='red' className='mr-5' /> ออกจากคิว</ModalHeader>
                        <ModalBody className="flex mb-6 md:mb-0 gap-4 ">
                            <p>คุณยืนยันการนำทีมของ {iseditUser?.firstPlayer} - {iseditUser?.secondPlayer} <br />ออกจากคิวหรือไม่?</p>
                        </ModalBody>
                        <div className="flex ">
                            <Button variant='bordered' size="md" className="basis-1/2" onClick={handleCloseModalAdd}>ยกเลิก</Button>
                            <Button variant='solid' size="md" className="button-primary basis-1/2" onClick={handleDeleteTeam}>ยืนยัน</Button>
                        </div>
                        <br />
                    </div>

                </ModalContent>
            </Modal>
        </div> : router.push('/')}</>
    )
}

export default Homepage
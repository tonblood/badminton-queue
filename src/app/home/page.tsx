'use client'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import badmintonInfo from '../../image/badminton-info.png'
import Image from 'next/image'
import { Button, Divider, Input, Modal, ModalContent, Spinner } from '@nextui-org/react'
import TeamPlayNow from './TeamPlayNow'
import versusImage from '../../image/versus-image.png'
import { ListAllPlayer, PlayerTeam } from './model'
import { RiContactsBook3Line } from 'react-icons/ri'
import { MdDeleteOutline } from 'react-icons/md'
import emptyPlayerList from '../../image/emptyPlayerList.png'
import { AddNewTeam, DeleteAllData, DeleteTeam, GetdataListQueues, UpdateTeamWin } from './service'

const Homepage = () => {
    const [teamOnePlaying, setTeamOnePlaying] = useState<PlayerTeam>()
    const [teamTwoPlaying, setTeamTwoPlaying] = useState<PlayerTeam>()
    const [awaitingTeamList, setAwaitingTeamList] = useState<PlayerTeam[]>([])
    const [isVisibleModal, setIsVisibleModal] = useState<boolean>(false)
    const [userOne, setUserOne] = useState<string>('')
    const [userTwo, setUserTwo] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const isLogin = sessionStorage.userInfo ? JSON.parse(sessionStorage.userInfo) : undefined
    const router = useRouter()

    useEffect(() => {
        setIsLoading(true)
        GetdataListQueues().then((res: ListAllPlayer) => {
            setTeamOnePlaying(res.teamOnePlay)
            setTeamTwoPlaying(res.teamTwoPlay)
            setAwaitingTeamList(res.teamQueueList || [])
        }).finally(() => setIsLoading(false))
    }, [])
    
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
                update_by: isLogin.name
            }
            setIsLoading(true)
            setIsVisibleModal(false)
            AddNewTeam(convertData).then((res: ListAllPlayer) => {
                setTeamOnePlaying(res.teamOnePlay)
                setTeamTwoPlaying(res.teamTwoPlay)
                setAwaitingTeamList(res.teamQueueList || [])
                setUserOne('')
                setUserTwo('')
            }).finally(() => setIsLoading(false))

        }
    }
    const handleCountWin = (id: string, winCount: number) => {
        const data = {
            winCount: winCount + 1,
            update_by: isLogin.name
        }
        setIsLoading(true)
        UpdateTeamWin(id, data).then((res: ListAllPlayer) => {
            setTeamOnePlaying(res.teamOnePlay)
            setTeamTwoPlaying(res.teamTwoPlay)
            setAwaitingTeamList(res.teamQueueList || [])
        }).finally(() => setIsLoading(false))
    }

    const handleDeleteTeam = (id: string) => {
        setIsLoading(true)
        DeleteTeam(id).then((res) => {
            setTeamOnePlaying(res.teamOnePlay)
            setTeamTwoPlaying(res.teamTwoPlay)
            setAwaitingTeamList(res.teamQueueList || [])
        }).finally(() => setIsLoading(false))
    }

    const deleteAllData = () => {
        setIsLoading(true)
        DeleteAllData().then((res) => {
            setTeamOnePlaying(res.teamOnePlay)
            setTeamTwoPlaying(res.teamTwoPlay)
            setAwaitingTeamList(res.teamQueueList || [])
        }).finally(() => setIsLoading(false))
    }

    return (
        <> {isLogin ? <div style={{ backgroundColor: '#fbfbfb' }}>
            <div className="header-containner grid grid-cols-3">
                <div className="grid grid-gaps-4 grid-rows-2 px-5 py-2">
                    <h2 className='content-end'>Course</h2>
                    <h3 className='content-start'>สนามที่ <span className='ml-3' style={{ color: '#fff', fontSize: 28, fontWeight: 'bold' }}>1</span></h3>
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
            <div style={{ padding: '10px 20px' }}>
                <p>กำลังเล่น...</p>
                <div className="container-playing-team grid grid-rows-3 mt-2">
                    {isLoading
                        ? <><div /><div className='grid content-center'>
                            <Spinner label='โปรดรอสักครู่...' />
                        </div></>
                        : <>
                            <TeamPlayNow isVisible={isLogin.name === 'admin-bad'} teamInfo={teamOnePlaying} handleClickWin={handleCountWin} disabledButton={awaitingTeamList.length < 2} />
                            <div className='grid justify-center'>
                                <Image alt='versus-image' src={versusImage} />
                            </div>
                            <TeamPlayNow isVisible={isLogin.name === 'admin-bad'} teamInfo={teamTwoPlaying} handleClickWin={handleCountWin} disabledButton={awaitingTeamList.length < 2} />
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
                                    {isLogin.name === 'admin-bad' ? <Button isIconOnly variant='light' onClick={() => handleDeleteTeam(it.id!!)}>
                                        <MdDeleteOutline fontSize={24} />
                                    </Button> : null}
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
                    <Button variant='solid' className='button-primary basis-2/2' onClick={() => { setIsVisibleModal(true) }}>เพิ่มทีมใหม่</Button>
                    {isLogin.name === 'admin-bad' ? <Button variant='bordered' className='button-default basis-2/2' onClick={deleteAllData}> Clear Data</Button> : null}
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
                            />
                            <Button variant='solid' size="md" className="button-primary" onClick={handleSubmitTeam}>ยืนยัน</Button>
                        </div>

                        <br />
                    </div>

                </ModalContent>
            </Modal>
        </div> : router.push('/') }</>
    )
}

export default Homepage
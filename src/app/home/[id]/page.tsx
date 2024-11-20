'use client'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import badmintonInfo from '../../../image/badminton-info.png'
import Image from 'next/image'
import { Accordion, AccordionItem, Button, Card, Divider, Input, Modal, ModalContent, Progress, Spinner } from '@nextui-org/react'
import { BiDownArrow } from 'react-icons/bi'
import TeamPlayNow from './TeamPlayNow'
import versusImage from '../../../image/versus-image.png'
import { PlayerTeam } from './model'
import { RiContactsBook3Line } from 'react-icons/ri'
import { makeid } from '@/app/component/makeId'
import { MdDeleteOutline } from 'react-icons/md'
import emptyPlayerList from '../../../image/emptyPlayerList.png'

const Homepage = () => {
    let isLogin = sessionStorage.getItem('userInfo') !== null
    const [teamOnePlaying, setTeamOnePlaying] = useState<PlayerTeam>()
    const [teamTwoPlaying, setTeamTwoPlaying] = useState<PlayerTeam>()
    const [awaitingTeamList, setAwaitingTeamList] = useState<PlayerTeam[]>([])
    const [isVisibleModal, setIsVisibleModal] = useState<boolean>(false)
    const [userOne, setUserOne] = useState<string>('')
    const [userTwo, setUserTwo] = useState<string>('')
    const [isLoadingOne, setIsLoadingOne] = useState<boolean>(false)
    const [isLoadingTwo, setIsLoadingTwo] = useState<boolean>(false)
    const [isLoadingTeamList, setIsLoadingTeamList] = useState<boolean>(false)
    const router = useRouter()

    useEffect(() => {
        setIsLoadingOne(true)
        setIsLoadingTwo(true)
        setIsLoadingTeamList(true)
        if (sessionStorage.getItem('teamOne') !== null && sessionStorage.getItem('teamOne') !== 'undefined') {
            const tempdata = JSON.parse(sessionStorage.getItem('teamOne')!!)
            setTeamOnePlaying(tempdata)
        }
        if (sessionStorage.getItem('teamTwo') !== null && sessionStorage.getItem('teamTwo') !== 'undefined') {
            setTeamTwoPlaying(JSON.parse(sessionStorage.getItem('teamTwo') || ''))
        }
        if (sessionStorage.getItem('awaitingTeam') !== null) {
            setAwaitingTeamList(JSON.parse(sessionStorage.getItem('awaitingTeam') || ''))
        }
        setTimeout(() => setIsLoadingOne(false), 1000)
        setTimeout(() => setIsLoadingTwo(false), 1000)
        setTimeout(() => setIsLoadingTeamList(false), 1000)
    }, [])

    const handleSubmitTeam = () => {
        if (userOne?.trim() && userTwo?.trim()) {
            const uuid = makeid(4)
            const convertData: PlayerTeam = {
                id: uuid,
                firstPlayer: userOne,
                secondPlayer: userTwo,
                winCount: 0
            }
            if (!teamOnePlaying) {
                setIsLoadingOne(true)
                setTimeout(() => setIsLoadingOne(false), 1000)
                setTeamOnePlaying(convertData)
                sessionStorage.setItem('teamOne', JSON.stringify(convertData))
            } else if (!teamTwoPlaying) {
                setIsLoadingTwo(true)
                setTimeout(() => setIsLoadingTwo(false), 1000)
                setTeamTwoPlaying(convertData)
                sessionStorage.setItem('teamTwo', JSON.stringify(convertData))
            } else {
                setAwaitingTeamList([...awaitingTeamList, convertData])
                setIsLoadingTeamList(true)
                setTimeout(() => setIsLoadingTeamList(false), 1000)
                sessionStorage.setItem('awaitingTeam', JSON.stringify([...awaitingTeamList, convertData]))
            }
            setIsVisibleModal(false)
            setUserOne('')
            setUserTwo('')

        }
    }

    const handleCountWin = (id: string, winCount: number) => {
        const newWinCount = winCount + 1
        if (newWinCount % 2) {
            const recentTeam = awaitingTeamList.shift()
            if (id === teamOnePlaying?.id) {
                if (teamTwoPlaying) {
                    teamTwoPlaying.winCount = 0
                    setAwaitingTeamList([...awaitingTeamList, teamTwoPlaying])
                    sessionStorage.setItem('awaitingTeam', JSON.stringify([...awaitingTeamList, teamTwoPlaying]))
                }
                teamOnePlaying.winCount = newWinCount
                setTeamTwoPlaying(recentTeam)
                setIsLoadingTwo(true)
                setTimeout(() => setIsLoadingTwo(false), 1000)
                sessionStorage.setItem('teamOne', JSON.stringify(teamOnePlaying))
                sessionStorage.setItem('teamTwo', JSON.stringify(recentTeam))
            } else if (id === teamTwoPlaying?.id) {
                if (teamOnePlaying) {
                    teamOnePlaying.winCount = 0
                    setAwaitingTeamList([...awaitingTeamList, teamOnePlaying])
                    sessionStorage.setItem('awaitingTeam', JSON.stringify([...awaitingTeamList, teamOnePlaying]))
                }
                teamTwoPlaying.winCount = newWinCount
                setTeamOnePlaying(recentTeam)
                setIsLoadingOne(true)
                setTimeout(() => setIsLoadingOne(false), 1000)
                sessionStorage.setItem('teamTwo', JSON.stringify(teamTwoPlaying))
                sessionStorage.setItem('teamOne', JSON.stringify(recentTeam))
            }
        } else {
            const teamone = awaitingTeamList.shift()
            const teamtwo = awaitingTeamList.shift()
            if (teamOnePlaying && teamTwoPlaying) {
                teamOnePlaying.winCount = 0
                teamTwoPlaying.winCount = 0
                setAwaitingTeamList(teamOnePlaying?.id === id ? [...awaitingTeamList, teamTwoPlaying, teamOnePlaying] : [...awaitingTeamList, teamOnePlaying, teamTwoPlaying])
            }
            setTeamOnePlaying(teamone)
            setTeamTwoPlaying(teamtwo)
            setIsLoadingOne(true)
            setIsLoadingTwo(true)
            setTimeout(() => setIsLoadingOne(false), 1000)
            setTimeout(() => setIsLoadingTwo(false), 1000)
            sessionStorage.setItem('teamOne', JSON.stringify(teamone))
            sessionStorage.setItem('teamTwo', JSON.stringify(teamtwo))
            sessionStorage.setItem('awaitingTeam', JSON.stringify(teamOnePlaying?.id === id ? [...awaitingTeamList, teamTwoPlaying, teamOnePlaying] : [...awaitingTeamList, teamOnePlaying, teamTwoPlaying]))
        }
        setIsLoadingTeamList(true)
        setTimeout(() => setIsLoadingTeamList(false), 1000)
    }

    const handleDeleteTeam = (id: string) => {
        setAwaitingTeamList(awaitingTeamList.filter((it) => it.id !== id))
        sessionStorage.setItem('awaitingTeam', JSON.stringify(awaitingTeamList.filter((it) => it.id !== id)))
        setIsLoadingTeamList(true)
        setTimeout(() => setIsLoadingTeamList(false), 1000)
    }

    return (
        <>{isLogin ? <div style={{ backgroundColor: '#fbfbfb' }}>
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
                    {isLoadingOne ? <div className='grid content-center'>
                        <Spinner label='โปรดรอสักครู่...' />
                    </div> : <TeamPlayNow teamInfo={teamOnePlaying} handleClickWin={handleCountWin} disabledButton={awaitingTeamList.length === 0} />}
                    <div className='grid justify-center'>
                        <Image alt='versus-image' src={versusImage} />
                    </div>
                    {isLoadingTwo ? <div className='grid content-center'>
                        <Spinner label='โปรดรอสักครู่...' />
                    </div> : <TeamPlayNow teamInfo={teamTwoPlaying} handleClickWin={handleCountWin} disabledButton={awaitingTeamList.length === 0} />}
                </div>
                <div className="grid grid-cols-2 mt-2">
                    <p>ลำดับทีม</p>
                    <p style={{ textAlign: 'end' }}>จำนวน {awaitingTeamList.length} คู่</p>
                </div>
                <div className="awaiting-team-containner">
                    {isLoadingTeamList ? <div className='grid content-center justify-center' style={{ height: '100%' }}>
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
                                    <Button isIconOnly variant='light' onClick={() => handleDeleteTeam(it.id)}>
                                        <MdDeleteOutline fontSize={24} />
                                    </Button>
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
                    <Button variant='solid' className='button-primary basis-1/2' onClick={() => { setIsVisibleModal(true) }}>เพิ่มทีมใหม่</Button>
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
        </div> : router.push('/')}</>
    )
}

export default Homepage
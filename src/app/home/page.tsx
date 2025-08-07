"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FaUser } from "react-icons/fa";
import {
    Button,
    Divider,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
    Modal,
    ModalBody,
    ModalContent,
    ModalHeader,
    Spinner,
} from "@nextui-org/react";
import { ListAllPlayer, PlayerTeam } from "./model";
import emptyPlayerList from "../../image/emptyPlayerList.png";
import {
    AddNewTeam,
    DeleteAllData,
    DeleteTeam,
    GetdataListQueues,
    UpdateTeamData,
    UpdateTeamWin,
} from "./service";
import { CgMoreVerticalAlt } from "react-icons/cg";
import { FiEdit } from "react-icons/fi";
import { FaSignOutAlt } from "react-icons/fa";

import { FaArrowDown } from "react-icons/fa6";
import PVP from "../component/PVP";
import Header from "../component/Header";
import styles from "../styles/Wait_Q.module.css";
import { io } from "socket.io-client";
import { BiSort } from "react-icons/bi";
import ModalManageQueue from "./ModalManageQueue";

const socket = io(process.env.NEXT_PUBLIC_BADMINTON_WEBSOCKET_QUEUE_PLAYER)

const Homepage = () => {
    const router = useRouter();
    const [teamOnePlaying, setTeamOnePlaying] = useState<PlayerTeam>();
    const [teamTwoPlaying, setTeamTwoPlaying] = useState<PlayerTeam>();
    const [awaitingTeamList, setAwaitingTeamList] = useState<PlayerTeam[]>([]);
    const [isVisibleModal, setIsVisibleModal] = useState<boolean>(false);
    // const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

    const [userOne, setUserOne] = useState<string>("");
    const [userTwo, setUserTwo] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const isLogin =
        typeof window !== "undefined"
            ? window.sessionStorage.userInfo
                ? JSON.parse(window.sessionStorage.userInfo)
                : router.push("/")
            : router.push("/");
    const [iseditUser, setIsEditUser] = useState<PlayerTeam | undefined>();
    const [isVisibleModalDelete, setIsVisibleModalDelete] =
        useState<boolean>(false);
    const [courtId, setCourtId] = useState<number>(3);
    const [isPlayedTwoRound, setIsPlayedTwoRound] = useState<boolean>(true);
    const [isFocused, setIsFocused] = useState(false);
    const [isFocused2, setIsFocused2] = useState(false);
    const [isVisibleModalManageQueue, setIsVisibleModalManageQueue] = useState<boolean>(false)

    useEffect(() => {
        setIsLoading(true);
        GetdataListQueues(courtId).then((res: ListAllPlayer) => {
            setTeamOnePlaying(res.teamOnePlay);
            setTeamTwoPlaying(res.teamTwoPlay);
            setAwaitingTeamList(res.teamQueueList || []);
        }).finally(() => setIsLoading(false));
        socket.emit("subscribe", courtId)
    }, [courtId]);

    useEffect(() => {
        socket.on("dataResponse", async (res: ListAllPlayer) => {
            setTeamOnePlaying(res.teamOnePlay)
            setTeamTwoPlaying(res.teamTwoPlay)
            setAwaitingTeamList(res.teamQueueList || [])
            await fetchData()
        })
    }, [])

    const fetchData = () => {
        socket.emit('complete')
    }

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
                courtId: courtId,
            };
            setIsLoading(true);
            setIsVisibleModal(false);
            if (iseditUser) {
                UpdateTeamData(iseditUser.id!!, courtId, convertData).then((res: ListAllPlayer) => {
                    setTeamOnePlaying(res.teamOnePlay);
                    setTeamTwoPlaying(res.teamTwoPlay);
                    setAwaitingTeamList(res.teamQueueList || []);
                    setUserOne("");
                    setUserTwo("");
                }).finally(() => setIsLoading(false));
            } else {
                AddNewTeam(convertData).then((res: ListAllPlayer) => {
                    setTeamOnePlaying(res.teamOnePlay);
                    setTeamTwoPlaying(res.teamTwoPlay);
                    setAwaitingTeamList(res.teamQueueList || []);
                    setUserOne("");
                    setUserTwo("");
                }).finally(() => setIsLoading(false));
            }
        }
        socket.emit('change', courtId)
    };
    const handleCountWin = (id: string, winCount: number) => {
        const data = {
            winCount: winCount + 1,
            update_by: isLogin.name,
        };
        setIsLoading(true);
        UpdateTeamWin(id, isPlayedTwoRound, courtId, data).then((res: ListAllPlayer) => {
            setTeamOnePlaying(res.teamOnePlay);
            setTeamTwoPlaying(res.teamTwoPlay);
            setAwaitingTeamList(res.teamQueueList || []);
        }).finally(() => setIsLoading(false));
        socket.emit('change', courtId)
    };

    const handleDeleteTeam = () => {
        setIsLoading(true);
        DeleteTeam(iseditUser?.id!!, courtId).then((res) => {
            setTeamOnePlaying(res.teamOnePlay);
            setTeamTwoPlaying(res.teamTwoPlay);
            setAwaitingTeamList(res.teamQueueList || []);
        }).finally(() => setIsLoading(false));
        setIsVisibleModalDelete(false);
        socket.emit('change', courtId)
    };

    const deleteAllData = () => {
        setIsLoading(true);
        DeleteAllData(courtId).then((res) => {
            setTeamOnePlaying(res.teamOnePlay);
            setTeamTwoPlaying(res.teamTwoPlay);
            setAwaitingTeamList(res.teamQueueList || []);
        }).finally(() => setIsLoading(false));
        socket.emit('change', courtId)
    };

    const handleEditData = (teamData: PlayerTeam) => {
        setIsEditUser(teamData);
        setUserOne(teamData.firstPlayer);
        setUserTwo(teamData.secondPlayer);
        setIsVisibleModal(true);
    };

    const handleCloseModalAdd = () => {
        setIsVisibleModal(false);
        setIsEditUser(undefined);
        setUserOne("");
        setUserTwo("");
        setIsVisibleModalDelete(false);
    };

    const handleDeleteData = (teamData: PlayerTeam) => {
        setIsEditUser(teamData);
        setIsVisibleModalDelete(true);
    };
    return (
        <> {isLogin ? (
            <div style={{ backgroundColor: "#fbfbfb" }}>
                {/* <div className="header-containner grid grid-cols-2">
                <div className="grid grid-gaps-4 grid-rows-2 px-5 py-2">
                    <h2 className='content-end'>Course</h2>
                    <h3 className='content-start'>สนามที่ <span className='ml-3' style={{ color: '#fff', fontSize: 42, fontWeight: 'bold' }}>{courtId}</span></h3>
                </div>
                <div className="content-end justify-end">
                    <Image src={badmintonInfo} alt="badminton-info" />
                </div>
            </div> */}
                <Header cID={courtId} />
                <div
                    className="grid content-end justify-center"
                    style={{ marginTop: "-30px" }}
                >
                    <Dropdown placement="bottom">
                        <DropdownTrigger>
                            <Button
                                isIconOnly
                                variant="solid"
                                style={{ borderRadius: "100%", backgroundColor: "white" }}
                            >
                                <FaArrowDown color="var(--primary-color)" fontSize={20} />
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu
                            disallowEmptySelection
                            selectionMode="single"
                            onSelectionChange={(value) =>
                                setCourtId(Number(value.currentKey))
                            }
                            style={{ width: "40vh" }}
                        >
                            <DropdownItem
                                key={1}
                                className="text-danger"
                                color="default"
                                isDisabled
                            >
                                <p className="basis-6/8 mr-10">สนามที่ 1 </p>
                            </DropdownItem>
                            <DropdownItem
                                key={2}
                                className="text-danger"
                                color="default"
                                isDisabled
                            >
                                <p className="basis-6/8 mr-10">สนามที่ 2 </p>
                            </DropdownItem>
                            <DropdownItem key={3} className="text-danger" color="default">
                                <p className="basis-6/8 mr-10">สนามที่ 3 </p>
                            </DropdownItem>
                            <DropdownItem key={4} className="text-danger" color="default">
                                <p className="basis-6/8 mr-10">สนามที่ 4 </p>
                            </DropdownItem>
                            <DropdownItem key={5} className="text-danger" color="default">
                                <p className="basis-6/8 mr-10">สนามที่ 5 </p>
                            </DropdownItem>
                            <DropdownItem key={6} className="text-danger" color="default">
                                <p className="basis-6/8 mr-10">สนามที่ 6 </p>
                            </DropdownItem>
                            <DropdownItem key={7} className="text-danger" color="default">
                                <p className="basis-6/8 mr-10">สนามที่ 7 </p>
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
                <div style={{ padding: "0px 20px" }}>
                    {isLogin.name === `admin-bad-court-${courtId}` ? <div className='flex gap-4'>
                        <Button className={`basis-1/2 ${isPlayedTwoRound ? 'button-primary' : 'button-default'}`} onClick={() => setIsPlayedTwoRound(true)}>เล่นแบบ 2 เกมออก</Button>
                        <Button className={`basis-1/2 ${!isPlayedTwoRound ? 'button-primary' : 'button-default'}`} onClick={() => setIsPlayedTwoRound(false)}>เล่นแบบ 1 เกมออก</Button>
                    </div>
                        : null}
                    {/* <div className="container-playing-team grid grid-rows-3 mt-2">
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
                </div> */}
                    <PVP
                        teamOne={teamOnePlaying}
                        teamTwo={teamTwoPlaying}
                        handleClickWin={handleCountWin}
                        disabledButton={awaitingTeamList.length < 2}
                        isVisible={isLogin.name === `admin-bad-court-${courtId}`}
                        isPlayedTwoRound={isPlayedTwoRound}
                    />

                    {/* <Wait_Q /> */}

                    <div>
                        <div
                            style={{
                                marginTop: "8px",
                                display: "flex",
                                marginBottom: "8px",
                            }}
                        >
                            <p style={{ paddingLeft: "8px", flexGrow: 1 }}>ลำดับทีม</p>
                            <p style={{ textAlign: "end", paddingRight: "8px" }}>
                                รอเล่น {awaitingTeamList.length} คู่
                            </p>
                        </div>
                        <div className="bg-white h-[410px] overflow-auto w-full p-4 rounded-2xl shadow-[0_4px_2px_rgba(0,0,0,0.1)] border-borderColor border-1">
                            {isLoading ? (
                                <div
                                    className="grid content-center justify-center"
                                    style={{ height: "100%" }}
                                >
                                    <Spinner label="โปรดรอสักครู่..." />
                                </div>
                            ) : awaitingTeamList.length ? (
                                awaitingTeamList.map((it, idx) => {
                                    return (
                                        <div key={it.id}>
                                            <div className="flex flex-row h-[48px] mb-[0px]">
                                                <div className="basis-6 grid content-center mr-4">
                                                    <p
                                                        style={{
                                                            justifySelf: "center",
                                                            color: "var(--primary-color)",
                                                            fontWeight: "bold",
                                                            fontSize: "16px",
                                                        }}
                                                    >
                                                        {idx + 3}
                                                    </p>
                                                </div>

                                                <div className="basis-full">
                                                    <p
                                                        style={{
                                                            color: "#989898",
                                                            fontSize: "12px",
                                                            marginBottom: "2px",
                                                        }}
                                                    >
                                                        ทีมของ :{" "}
                                                    </p>
                                                    <h4
                                                        style={{
                                                            color: "#333",
                                                            fontSize: "16px",
                                                            fontWeight: "bold",
                                                        }}
                                                    >
                                                        {it.firstPlayer} - {it.secondPlayer}
                                                    </h4>
                                                </div>

                                                <div
                                                    className="basis-4 grid content-center"
                                                    style={{ textAlign: "end" }}
                                                >
                                                    {isLogin.name === `admin-bad-court-${courtId}` ? (
                                                        <Dropdown placement="bottom-end">
                                                            <DropdownTrigger>
                                                                <Button
                                                                    isIconOnly
                                                                    variant="bordered"
                                                                    className="w-[24px]"
                                                                >
                                                                    {/* <MdDeleteOutline fontSize={24} /> */}
                                                                    <CgMoreVerticalAlt
                                                                        fontSize={16}
                                                                        color="var(--primary-color)"
                                                                    />
                                                                </Button>
                                                            </DropdownTrigger>

                                                            <DropdownMenu
                                                                aria-label="Static Actions"
                                                                className="p-[8px]"
                                                            >
                                                                <DropdownItem
                                                                    className="h-[44px]"
                                                                    onClick={() => handleEditData(it)}
                                                                    endContent={
                                                                        <FiEdit
                                                                            className="basis-2/8 text-text_color"
                                                                            fontSize={16}
                                                                        />
                                                                    }
                                                                >
                                                                    <p className="basis-6/8 text-text_color">
                                                                        แก้ไขข้อมูล
                                                                    </p>
                                                                </DropdownItem>
                                                                <DropdownItem
                                                                    key="delete"
                                                                    className="text-danger h-[44px] "
                                                                    onClick={() => handleDeleteData(it)}
                                                                    endContent={
                                                                        <FaSignOutAlt
                                                                            className="basis-2/8 text-danger"
                                                                            fontSize={16}
                                                                        />
                                                                    }
                                                                >
                                                                    <p className="basis-6/8 mr-10 text-danger ">
                                                                        ออกจากคิว
                                                                    </p>
                                                                </DropdownItem>
                                                            </DropdownMenu>
                                                        </Dropdown>
                                                    ) : null}
                                                </div>
                                            </div>
                                            <div className={styles.line}></div>
                                        </div>
                                    );
                                })
                            ) : (
                                <div
                                    className="grid content-center justify-center pt-16 pb-12"
                                    style={{ height: "100%" }}
                                >
                                    <Image src={emptyPlayerList} alt="empty player list" />
                                    <span
                                        className="my-5 "
                                        style={{ textAlign: "center", color: "#636363" }}
                                    >
                                        ไม่มีทีมต่อคิว
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>

                    <div
                        style={{
                            display: "flex",
                            gap: "16px",
                            paddingTop: "24px",
                            justifyContent: "center",
                        }}
                    >
                        {isLogin.name === `admin-bad-court-${courtId}` ? (
                            <Button
                                style={{ width: "100%" }}
                                radius="full"
                                variant="bordered"
                                size="lg"
                                className="button-default"
                                onClick={() => setIsVisibleModalManageQueue(true)}
                            >
                                จัดลำดับคิว
                            </Button>
                        ) : null}
                        <Button
                            style={{ width: "100%" }}
                            onClick={() => {
                                setIsVisibleModal(true);
                                setIsEditUser(undefined);
                            }}
                            radius="full"
                            variant="solid"
                            size="lg"
                            className="button-primary"
                        >
                            เพิ่มทีม
                        </Button>
                    </div>

                    {/* <div className="flex flex-row">
                    <Button variant='solid' className='button-primary basis-2/2' onClick={() => { setIsVisibleModal(true); setIsEditUser(undefined); }}>เพิ่มทีมใหม่</Button>
                    {isLogin.name === `admin-bad-court-${courtId}` ? <Button variant='bordered' className='button-default basis-2/2' onClick={deleteAllData}> Clear Data</Button> : null}
                </div> */}
                </div>

                <div>
                    {/* Modal */}
                    {isVisibleModal && (
                        <div
                            className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-end"
                            onClick={() => setIsVisibleModal(false)} // ปิด Modal เมื่อคลิกพื้นที่นอกกล่อง
                        >
                            <div
                                className="w-full h-2/3 max-w-md bg-white rounded-t-[32px] pt-[24px] pr-[16px] pl-[16px] pb-[32px]"
                                onClick={(e) => e.stopPropagation()} // ป้องกันการปิด Modal เมื่อคลิกในกล่อง
                            >
                                <Divider
                                    style={{
                                        backgroundColor: "var(--Secondary-E4C2BB)",
                                        height: 6,
                                        width: 50,
                                        borderRadius: 8,
                                        justifySelf: "center",
                                        marginBottom: "32px",
                                    }}
                                />
                                <h2 className="text-center text-[20px] font-bold mb-[24px] text-Active_Icon_color">
                                    {iseditUser ? "แก้ไขข้อมูลทีม" : "เพิ่มทีม"}
                                </h2>

                                <div
                                    style={{ marginBottom: "24px" }}
                                    className={`flex items-center border-1 rounded-full	 p-2 transition h-12 h-fill pl-4 ${isFocused
                                        ? "border-Active_Icon_color shadow-[0_4px_2px_rgba(0,0,0,0.1)]"
                                        : "border-default_Icon_color"
                                        }`}
                                >
                                    <FaUser
                                        className={`mr-2 text-lg transition ${isFocused
                                            ? "text-Active_Icon_color"
                                            : "text-default_Icon_color"
                                            }`}
                                    />
                                    <input
                                        type="text"
                                        placeholder="กรุณาใส่ชื่อผู้เล่นคนที่ 1"
                                        className="flex-1 focus:outline-none text-text_color"
                                        onFocus={() => setIsFocused(true)} // เมื่อ Input ถูก Focus
                                        onBlur={() => setIsFocused(false)} // เมื่อ Focus หลุดออกจาก Input
                                        value={userOne}
                                        // isInvalid={!userOne}
                                        onChange={(e) => {
                                            setUserOne(e.target.value);
                                        }}
                                    />
                                </div>

                                <div
                                    style={{ marginBottom: "24px" }}
                                    className={`flex items-center border-1 rounded-full	 p-2 transition h-12 h-fill pl-4 ${isFocused2
                                        ? "border-Active_Icon_color shadow-[0_4px_2px_rgba(0,0,0,0.1)]"
                                        : "border-default_Icon_color"
                                        }`}
                                >
                                    <FaUser
                                        className={`mr-2 text-lg transition ${isFocused2
                                            ? "text-Active_Icon_color"
                                            : "text-default_Icon_color"
                                            }`}
                                    />
                                    <input
                                        type="text"
                                        placeholder="กรุณาใส่ชื่อผู้เล่นคนที่ 2"
                                        className="flex-1 focus:outline-none text-text_color"
                                        onFocus={() => setIsFocused2(true)} // เมื่อ Input ถูก Focus
                                        onBlur={() => setIsFocused2(false)} // เมื่อ Focus หลุดออกจาก Input
                                        value={userTwo}
                                        // isInvalid={!userTwo}
                                        onChange={(e) => {
                                            setUserTwo(e.target.value);
                                        }}
                                    />
                                </div>

                                <Button
                                    style={{
                                        borderRadius: "32px",
                                        height: "48px",
                                        width: "100%",
                                    }}
                                    variant="solid"
                                    size="md"
                                    className={`${userOne && userTwo
                                        ? "bg-custom_GD text-white cursor-pointer"
                                        : "bg-disable_Color text-white cursor-not-allowed"
                                        }`}
                                    onClick={handleSubmitTeam}
                                >
                                    ยืนยัน
                                </Button>

                            </div>
                        </div>
                    )}
                </div>

                <Modal
                    isOpen={isVisibleModalDelete}
                    placement="center"
                    onClose={handleCloseModalAdd}
                    hideCloseButton={true}
                >
                    <ModalContent>
                        <div className="pt-[8px]">
                            <ModalHeader className="flex gap-[8px] h-[80px] border-b font-bold text-[20px] text-text_color p">
                                {" "}
                                <FaSignOutAlt
                                    fontSize={48}
                                    color="white"
                                    className="bg-danger p-[8px] rounded-[8px]"
                                />{" "}
                                <div style={{ alignSelf: "center" }}>ออกจากคิว</div>
                            </ModalHeader>

                            <ModalBody className="flex content-center border-b">
                                <p className="flex text-16 pt-[16px] pb-[0px] text-text_color">
                                    คุณยืนยันการนำ{" "}
                                    <div className="text-16 font-bold text-Active_Icon_color ml-[4px]">
                                        ทีมของ {iseditUser?.firstPlayer} -{" "}
                                        {iseditUser?.secondPlayer}{" "}
                                    </div>
                                </p>
                                <div className="pb-[16px] text-text_color">
                                    ออกจากคิวหรือไม่?
                                </div>
                            </ModalBody>
                            <div
                                style={{
                                    display: "flex",
                                    gap: "16px",
                                    justifyContent: "center",
                                    padding: "24px 16px 0px 16px",
                                }}
                            >
                                <Button
                                    style={{ width: "100%" }}
                                    radius="full"
                                    variant="ghost"
                                    size="md"
                                    className="button-default"
                                    onClick={handleCloseModalAdd}
                                >
                                    ยกเลิก
                                </Button>
                                <Button
                                    style={{ width: "100%" }}
                                    radius="full"
                                    variant="solid"
                                    size="md"
                                    className="button-primary"
                                    onClick={handleDeleteTeam}
                                >
                                    ยืนยัน
                                </Button>
                            </div>
                            <br />
                        </div>
                    </ModalContent>
                </Modal>
                {isVisibleModalManageQueue ?
                    <Modal
                        isOpen={isVisibleModalManageQueue}
                        placement="center"
                        onClose={handleCloseModalAdd}
                        hideCloseButton={true}
                    >
                        <ModalContent>
                            <div className="pt-[8px]">
                                <ModalHeader className="flex gap-[8px] h-[80px] border-b font-bold text-[20px] text-text_color p">
                                    {" "}
                                    <BiSort
                                        fontSize={48}
                                        color="white"
                                        className="bg-danger p-[8px] rounded-[8px]"
                                    />{" "}
                                    <div style={{ alignSelf: "center" }}>จัดลำดับคิว</div>

                                </ModalHeader>
                            </div>
                            <ModalBody>
                                <ModalManageQueue awaittingTeamList={awaitingTeamList} setIsVisibleModal={setIsVisibleModalManageQueue} courtId={courtId} setAwatingTeamList={setAwaitingTeamList} setIsLoading={setIsLoading}/>
                            </ModalBody>
                        </ModalContent>
                    </Modal>
                    : null}
            </div>
        ) : (
            router.push("/")
        )}</>
    );
};

export default Homepage;

'use client'

import Image from "next/image";
import badminton from '../image/badminton.png';
import { Button } from "@nextui-org/button";
import Link from "next/link";
import { Modal, ModalContent } from "@nextui-org/modal";
import { useEffect, useState } from "react";
import { Input } from "@nextui-org/input";
import { Divider } from "@nextui-org/divider";
import { RiContactsBook3Line } from "react-icons/ri";
import { Checkbox } from "@nextui-org/checkbox";
import { useRouter } from "next/navigation";


export default function Home() {
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false)
    const [isPasswordVisible, setisPasswordVisible] = useState<boolean>(false)
    const [userName, setUserName] = useState<string>()
    const [dataUser, setDataUser] = useState<any>()
    const router = useRouter()

    useEffect(() => {
        if(sessionStorage.getItem('userInfo')) {
            setDataUser(JSON.parse(sessionStorage.getItem('userInfo') || ''))
        }
    },[])

    const makeid = (length: number) => {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < length) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
          counter += 1;
        }
        return result;
    }

    const handleLogin = () => {
        if(userName?.trim) {
            const uuid = makeid(4)
            router.push(`/home/${uuid}`)
            const userInfo = {
                name: userName,
                uuid: uuid
            }
            sessionStorage.setItem('userInfo', JSON.stringify(userInfo))
        }
        
    }

    return ( <>
    {dataUser ? router.push(`home/${dataUser.uuid}`) : <div className="container-login">
            <Image src={badminton} alt="badminton" style={{ marginTop: 50, width: '100px' }} />
            <br />
            <h1 >Q-Team</h1>
            <p>ระบบจัดเรียงลำดับ <br /> การเล่นแบดมินตันที่ KKU Sports Complex</p>
            <Button radius="full" variant="solid" size="lg" className="button-primary"><Link href='/register'>ลงทะเบียน</Link></Button>
            <Button onClick={() => setIsModalVisible(true)} radius="full" variant='bordered' size="lg" className="button-default">เข้าสู่ระบบ</Button>

            <Modal
                isOpen={isModalVisible}
                placement="bottom-center"
                onClose={() => setIsModalVisible(false)}
                hideCloseButton={true}
            >
                <ModalContent>
                    <div className="container-login-modal">
                        <Divider style={{ backgroundColor: 'var(--primary-color)', height: 3, width: 40, borderRadius: 8 }} />

                        <h2 style={{ margin: 20 }}>เข้าสู่ระบบ</h2>
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
                                placeholder="ชื่อของคุณ"
                                labelPlacement="outside"
                                startContent={
                                    <RiContactsBook3Line />
                                }
                                isRequired
                                value={userName}
                                onChange={(e) => {setUserName(e.target.value)}}
                            />
                            <Checkbox defaultSelected size="sm" color='warning'>ให้ฉันอยู่ในระบบ</Checkbox>
                            <Button onClick={handleLogin} radius="full" variant='solid' size="lg" className="button-primary" >เข้าสู่ระบบ</Button>
                        </div>
                        
                        <br />
                    </div>

                </ModalContent>
            </Modal>
        </div>}
    </>
        
    );
}

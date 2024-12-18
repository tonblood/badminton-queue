"use client";
import Image from "next/image";
import badminton from "../image/badminton.png";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import { Modal, ModalContent } from "@nextui-org/modal";
import { useEffect, useState } from "react";
import { Input } from "@nextui-org/input";
import { Divider } from "@nextui-org/divider";
import { RiContactsBook3Line } from "react-icons/ri";
import { Checkbox } from "@nextui-org/checkbox";
import { useRouter } from "next/navigation";
import { makeid } from "./component/makeId";
// import Default_Button from "./component/button";
import styles from "./styles/button.module.css";
import textInput from "./component/text_input";
import { FaUser } from "react-icons/fa";
import styles_Input from "./styles/text_input.module.css";

export default function Home() {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isPasswordVisible, setisPasswordVisible] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>();
  const router = useRouter();
  const [isFocused, setIsFocused] = useState(false);

  const handleLogin = () => {
    if (userName?.trim) {
      const uuid = makeid(4);
      router.push(`/home`);
      const userInfo = {
        name: userName,
        uuid: uuid,
      };
      sessionStorage.setItem("userInfo", JSON.stringify(userInfo));
    }
  };

  return (
    <div className="container-login">
      <Image
        src={badminton}
        alt="badminton"
        style={{ marginTop: 50, width: "186px" }}
      />
      <br />
      <h1>Q-Team</h1>
      <p>
        ระบบจัดเรียงลำดับ <br /> การเล่นแบดมินตันที่ KKU Sports Complex
      </p>
      <br />
      <br />
      <div className="Button_Frame">
        <Button
          radius="full"
          variant="solid"
          size="lg"
          className="button-disable"
        >
          <Link href="#">ลงทะเบียน</Link>
        </Button>
        <Button
          onClick={() => setIsModalVisible(true)}
          radius="full"
          variant="bordered"
          size="lg"
          className="button-default"
        >
          เข้าสู่ระบบ
        </Button>
      </div>

      <Modal
        isOpen={isModalVisible}
        placement="bottom-center"
        onClose={() => setIsModalVisible(false)}
        hideCloseButton={true}
      >
        <ModalContent>
          <div className="container-login-modal">
            <Divider
              style={{
                backgroundColor: "var(--Secondary-E4C2BB)",
                height: 6,
                width: 50,
                borderRadius: 8,
              }}
            />
            <h2 style={{ margin: 20, fontSize: "18px", fontWeight: "bold" }}>
              เข้าสู่ระบบ
            </h2>
            <div className="grid grid-cols-1 w-full md:flex-nowrap mb-6 md:mb-0 gap-0 px-2">
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
              {/* <Input
                type="text"
                // label="Email"
                className="focus: outline-none placeholder-default_Icon_color text-base focus:text-text_color"
                style={{ height: "48px" }}
                placeholder="ชื่อของคุณ"
                labelPlacement="outside"
                startContent={<FaUser />}
                isRequired
                value={userName}
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
              /> */}
              {/* <textInput/> */}
              <div style={{ gap: "24px" }}>
                <div style={{ marginBottom: "24px" }}
                  className={`flex items-center border-1 rounded-full	 p-2 transition h-12 h-fill pl-4 ${
                    isFocused
                      ? "border-Active_Icon_color shadow-[0_4px_2px_rgba(0,0,0,0.1)]"
                      : "border-default_Icon_color"
                  }`}
                >
                  <FaUser
                    className={`mr-2 text-lg transition ${
                      isFocused
                        ? "text-Active_Icon_color"
                        : "text-default_Icon_color"
                    }`}
                  />
                  <input
                    type="text"
                    placeholder="กรุณาใส่ชื่อ"
                    className="flex-1 focus:outline-none text-text_color"
                    onFocus={() => setIsFocused(true)} // เมื่อ Input ถูก Focus
                    onBlur={() => setIsFocused(false)} // เมื่อ Focus หลุดออกจาก Input
                    value={userName}
                    onChange={(e) => {
                      setUserName(e.target.value);
                    }}
                  />
                </div>

                {/* <div
                  style={{}}
                  className={`flex items-center border-1 rounded-full	 p-2 transition h-12 h-fill pl-4 ${
                    isFocused
                      ? "border-Active_Icon_color shadow-[0_4px_2px_rgba(0,0,0,0.1)]"
                      : "border-default_Icon_color"
                  }`}
                >
                  <FaUser
                    className={`mr-2 text-lg transition ${
                      isFocused
                        ? "text-Active_Icon_color"
                        : "text-default_Icon_color"
                    }`}
                  />
                  <input
                    type="text"
                    placeholder="กรุณาใส่ชื่อ"
                    className="flex-1 focus:outline-none text-text_color"
                    onFocus={() => setIsFocused(true)} // เมื่อ Input ถูก Focus
                    onBlur={() => setIsFocused(false)} // เมื่อ Focus หลุดออกจาก Input
                    value={userName}
                    onChange={(e) => {
                      setUserName(e.target.value);
                    }}
                  />
                </div> */}
              </div>

              {/* <Checkbox defaultSelected size="sm" color="warning">
                ให้ฉันอยู่ในระบบ
              </Checkbox> */}
              <Button
                disabled={!userName}
                onClick={handleLogin}
                radius="full"
                variant="solid"
                size="lg"
                className={`${
                  userName
                    ? "bg-custom_GD text-white cursor-pointer"
                    : "bg-disable_Color text-white cursor-not-allowed"
                }`}
              >
                เข้าสู่ระบบ
              </Button>
            </div>

            <br />
          </div>
        </ModalContent>
      </Modal>
    </div>
  );
}

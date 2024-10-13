'use client'

import Image from "next/image";
import badminton from '../image/badminton.png';
import {Button} from "@nextui-org/button";

export default function Home() {
  return (
    <div className="container-login">
      <Image src={badminton} alt="badminton" style={{marginTop: 150}} />

      <br />
      <h1 >Q-Team</h1>
      <p>ระบบจัดเรียงลำดับ <br /> การเล่นแบดมินตันที่ KKU Sports Complex</p>
      <Button radius="full" variant="solid" size="lg" className="button-primary">ลงทะเบียน</Button>
      <Button radius="full" variant='bordered' size="lg" className="button-default">เข้าสู่ระบบ</Button>
    </div>
  );
}

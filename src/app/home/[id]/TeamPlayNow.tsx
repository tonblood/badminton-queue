import { Button } from '@nextui-org/react'
import React from 'react'
import trophy from '../../../image/trophy.png'
import Image from 'next/image'

const TeamPlayNow = () => {
    return (
        <div className='flex flex-row mx-3'>
            <div className="basis-4/5 grid grid-rows-2">
                <p>ทีมของ</p>
                <h4>ละมุด - ลำไย</h4>
            </div>
            <div className="basis-1/5" style={{textAlign:'end'}}>
                <Button variant='bordered' size='sm' startContent={<Image src={trophy} alt='trophy'/>}>(1/2)</Button>
            </div>
        </div>
    )
}

export default TeamPlayNow
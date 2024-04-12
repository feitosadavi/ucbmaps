'use client'

import Input from 'src/app/components/Input';
import Button from 'src/app/components/Button';
import { useRouter } from 'next/navigation';

import React, { useRef, useEffect, useState, WheelEventHandler } from 'react';
import { Chart } from 'src/app/components/Chart';

interface Point {
  x: number;
  y: number;
}

type Path = {
  id: string
  distanceToCenter: number[]
  size: number
  bonding: string[]
}

type Map = {
  center: number[] // latitude, longitude
  paths: Path[]
}


export default function Home () {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  
  const [latitude, setLatitude] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);

  function drawMap (map: Map) {
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) throw new Error('canvas not found');

    for (const path of map.paths) {
      ctx.moveTo(100, 100);
      ctx.lineTo(0, 0);
      // ctx.lineWidth = 20;
      ctx.stroke()
    }
  }

  React.useEffect(() => {
    const map: Map = {
      center: [-15.7783, -47.9319],
      paths: [{
        id: 'entrada',
        distanceToCenter: [10, 30],
        size: 50,
        bonding: ['descida']
      }]
    }

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        console.log(position)
        setLatitude(Math.abs(position.coords.latitude));
        setLongitude(Math.abs(position.coords.longitude));
      },
      (error) => {
        console.error('Error getting geolocation:', error);
      }
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };

    // drawMap(map)

  }, [])

  React.useEffect(() => {
    console.log({latitude, longitude})
  }, [latitude])

  const personRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState('')

  const move = () => {
    const style = personRef.current?.style;
    console.log(style)
    if (style) {
      style.top = '10px';
    }
  }
  
  const changePersonPosition = () => {
    const style = personRef.current?.style;
    if (style) {
      style.top = '10px';
    }
  }

  return (
    <main style={{
      width: latitude,
      height: longitude
    }}>
      <div
        ref={personRef}
        onChange={changePersonPosition}
        id="person"
        style={{
          position: 'absolute',
          width: '10px',
          height: '10px',
          backgroundColor: 'blue',
          borderRadius: '100%',
          top: latitude,
          left: longitude
        }}
      ></div>
    </main>
    );
  }
  //
  //   <canvas
  //     width={viewportSize.width}
  //     height={viewportSize.height}
  //   ref={canvasRef}
  //   style={{background: 'aqua'}}
  // />
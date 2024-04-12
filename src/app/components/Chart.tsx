'use client'

import { useRouter } from 'next/navigation';

import React, { useRef, useEffect, useState } from 'react';

interface BarChartProps {
  data: number[];
  width: number;
  height: number;
}

export const Chart: React.FC<BarChartProps> = ({data, width, height}) => {
  const router = useRouter()
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [barWidth, setBarWidth] = useState(0);
  const [maxBarHeight, setMaxBarHeight] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const barMargin = 10;
    const totalBars = data.length;
    const availableWidth = width - (barMargin * (totalBars + 1));
    const calculatedBarWidth = Math.floor(availableWidth / totalBars);
    setBarWidth(calculatedBarWidth);
    setMaxBarHeight(height - 50);

    ctx.clearRect(0, 0, width, height);

    data.forEach((value, index) => {
      const barHeight = (value / 100) * maxBarHeight;
      const x = barMargin + (index * (barWidth + barMargin));
      const y = height - barHeight - 30;

      ctx.fillStyle = 'blue';
      ctx.fillRect(x, y, barWidth, barHeight);
    });
  }, [data, width, height, barWidth, maxBarHeight]);

  const handleBarClick = (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const offsetX = event.clientX - rect.left;
    const offsetY = event.clientY - rect.top;

    const barMargin = 10;
    const totalBars = data.length;
    const barSpace = barWidth + barMargin;
    const index = Math.floor(offsetX / barSpace);

    let newValue: any = prompt(`Novo valor para a barra ${index + 1}:`);
    if (newValue !== null) {
      newValue = parseFloat(newValue);
      if (!isNaN(newValue) && newValue >= 0 && newValue <= 100) {
        const newData = [...data];
        newData[index] = newValue;
        // Atualiza os dados
        // Aqui você pode passar o novo array de dados para outro componente, por exemplo
      } else {
        alert('Por favor, insira um número válido entre 0 e 100.');
      }
    }
  };

  const getGeo = () => {
      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(showPosition, showError);
      } else {
          alert("Geolocalização não é suportada por este navegador.");
      }

    function showPosition(position: any) {
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;
        alert("Latitude: " + latitude + "\nLongitude: " + longitude);
    }

    function showError(error: any) {
      switch (error.code) {
        case error.PERMISSION_DENIED:
          alert("Usuário negou a solicitação de geolocalização.");
          break;
        case error.POSITION_UNAVAILABLE:
          alert("Informações de localização indisponíveis.");
          break;
        case error.TIMEOUT:
          alert("A solicitação de geolocalização expirou.");
          break;
        case error.UNKNOWN_ERROR:
          alert("Ocorreu um erro desconhecido.");
          break;
      }
    }
  }

  

  return <canvas ref={canvasRef} width={width} height={height} onClick={handleBarClick}></canvas>;
}

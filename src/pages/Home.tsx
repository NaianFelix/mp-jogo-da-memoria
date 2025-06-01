import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handlePlay = () => {
    if (name.length) {
      localStorage.setItem('playerName', name);
      navigate("/Game");
    }
  };
  return (
    <>
      <img
        className="-z-10 fixed h-full w-full object-cover"
        src="/images/shen.png"
        alt=""
      />
      <img className="w-[202px] h-[152px] " src="/images/brain.png" alt="" />
      <h1 className="mb-14 text-7xl text-white font-title drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
        Jogo da Memória
      </h1>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="outline-none mb-5 rounded-[10px] bg-gray-300 pl-[44px] text-[40px] w-full max-w-[516px] h-[117px]"
        type="text"
        placeholder="Escreva seu nome"
      />
      <button
        onClick={handlePlay}
        disabled={name.length == 0}
        className="bg-[#FFA608] text-[#FF6D00] disabled:bg-gray-300 rounded-[10px] w-full max-w-[516px] h-[117px] text-6xl disabled:text-gray-400 font-title drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]"
      >
        {" "}
        Play{" "}
      </button>
    </>
  );
};

export default Home;

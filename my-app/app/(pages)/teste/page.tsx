'use client'
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useActionState, useState } from "react";

//Objetos typeScript
type Pessoa =
  {
    nome?: string,
    idade: number
  }

// variavel de estados
const x = [
  'thiago',
  'Pedro',
  'Joao'

]

// useState     useEffect  useActionState 
export default function LandinPage() {

  const [suco, setSuco] = useState('suco de laranja')
  const [contador, setContador] = useState(0)
  const [input, setInput] = useState("Teste");

  const adicionarNumero = () => {
    setContador(contador + 1);
  }

  const MudarNome = () => {
    setSuco("Mudou de nome");
  }

  function chamarTodos() {
    MudarNome();
    adicionarNumero();
  }

  const mudarArray = () => {
    x.map((nomes) => {
      return <p>{nomes}</p>
    })
  }
  ///Objeto
  let pessoa: Pessoa;

  pessoa = {
    nome: "Bruno",
    idade: 37
  };

  return (
    <section>
      <div className="grid h-180 content-center space-x-18 gap-8  px-120 py-12 ">
        <div>
          <h5 className="text-fuchsia-950  font-bold">A variavel é : {suco}
            <p />
            contando:{contador}</h5>
          <p />
        </div>
        <br />
        <div className="content-center">
          <input className="bg-amber-600" onChange={event => setInput(event.target.value)} value={input} />
          <div> valor de input:
            {input}
          </div>
        </div>
        <p />
        <div className="content-center">
          <Button color="primary" onClick={chamarTodos}> Contador</Button>
        </div>

        <div>
          <h3>Maps</h3>
          {
            x.map((nomes) => {
              return <p>{nomes}</p>
            })
          }
        </div>

        <br />
        <h3>Objeto</h3>
        <div>{pessoa.nome}</div>
        <div>{pessoa.idade}</div>
      </div>
    </section>
  )
}

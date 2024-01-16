import Image from 'next/image'
import styles from './page.module.css'
import { getAllTasks } from './services/api';

export default function Home() {
  // getAllTasks();
  // console.log(getAllTasks());
  return (
    <main>
      <div>
        Testando o Next.js 
      </div>
    </main>
  )
}

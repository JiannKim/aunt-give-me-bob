import { initializeApp } from 'firebase/app'
import { getDatabase, ref, set, get, child } from 'firebase/database'
import dayjs from 'dayjs'

const initializeFirebase = () => {
  const firebaseConfig = {
    databaseURL: 'https://auntgivemebob-default-rtdb.asia-southeast1.firebaseio.com'
  }
  
  const app = initializeApp(firebaseConfig)
  getDatabase(app)

  return app
}

/**
 * 특정 날짜에 메뉴 데이터 쓰기
 * @param {*} date 날짜 '2022-06-29' or Date
 * @param {*} menus 입력한 메뉴들
 */
const writeMealData = (date, menus) => {
  const db = getDatabase()
  set(ref(db, dayjs(date).format('YYYYMMDD')), {
    menus,
  })
}

/**
 * 특정 날짜의 메뉴 가져오기
 * @param {*} date 날짜 '2022-06-29' or Date
 */
const getMealData = async (date = new Date()) => {
  const db = getDatabase()
  const menus = await get(ref(db, dayjs(date).format('YYYYMMDD')))

  return menus.exists() ? menus.val()?.menus ?? '' : ''
}

export { initializeFirebase, writeMealData, getMealData }
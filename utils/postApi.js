// @flow
import Prismic from 'prismic.io'
import compileMdToHtml from './markdown'
import type {DiaryObjectType} from '../types'

const API_ENDPOINT = process.env.PRISMIC_API_ENDPOINT
const ACCESS_TOKEN = process.env.PRISMIC_ACCESS_TOKEN
const CUSTOM_TYPE: string = String(process.env.PRISMIC_CUSTOM_TYPE)

const fetchApi = () => {
  return Prismic.api(API_ENDPOINT, {
    accessToken: ACCESS_TOKEN,
  })
}

const convertDocumentToDiary: () => DiaryObjectType = (doc: any) => {
  const coverDoc = doc.getGroup(`${CUSTOM_TYPE}.cover`).value[0]
  const image = coverDoc.getImage('image')

  const diary = {
    id: doc.id,
    title: doc.getText(`${CUSTOM_TYPE}.title`),
    body: compileMdToHtml(doc.getText(`${CUSTOM_TYPE}.body`)),
    published: doc.getDate(`${CUSTOM_TYPE}.published`).toISOString().slice(0, 10),
    cover: {
      image: image.url,
      width: image.main.width,
      height: image.main.height,
      alternateText: coverDoc.getText('alternate-text'),
      caption: coverDoc.getText('caption'),
    },
  }
  return diary
}

export const fetchAllDiaries: () => Promise<Array<DiaryObjectType>> = async () => {
  const api = await fetchApi()
  const {results: docs} = await api.query(Prismic.Predicates.at('document.type', CUSTOM_TYPE), {orderings: `[my.${CUSTOM_TYPE}.published]`})
  const diaries = docs.map(convertDocumentToDiary).reverse()
  return diaries
}

export const fetchDiaryById: (id: string) => Promise<DiaryObjectType | void> = async (id) => {
  const api = await fetchApi()
  const doc = await api.getByID(id)
  if (!doc) {
    throw new Error('Document with such ID can not be found.')
  }
  const diary = convertDocumentToDiary(doc)
  return diary
}

export const fetchNextDiary: (id: string) => Promise<DiaryObjectType | void> = async (id) => {
  const allDiaries = await fetchAllDiaries()
  const currentIndex = allDiaries.findIndex(diary => diary.id === id)
  const nextDiary = allDiaries[currentIndex - 1]
  return nextDiary
}

export const fetchPrevDiary: (id: string) => Promise<DiaryObjectType | void> = async (id) => {
  const allDiaries = await fetchAllDiaries()
  const currentIndex = allDiaries.findIndex(diary => diary.id === id)
  const prevDiary = allDiaries[currentIndex + 1]
  return prevDiary
}

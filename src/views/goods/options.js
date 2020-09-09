import { genOptionList } from '@/utils/index'

// 大小
export const sizeStatus = {
  MIDDLE: 1,
  BIG: 2,
  SUPERBIG: 3
}

export const sizeStatusMap = {
  [sizeStatus.MIDDLE]: '中杯',
  [sizeStatus.BIG]: '大杯',
  [sizeStatus.SUPERBIG]: '超大杯',
}

export const sizeStatusOptions = genOptionList(sizeStatus, sizeStatusMap)

// 人群性别限定
export const sexLimitStatus = {
  UNLIMIT: 0,
  LIMIT: 1,
}

export const sexLimitStatusMap = {
  [sexLimitStatus.UNLIMIT]: '不限定',
  [sexLimitStatus.LIMIT]: '限定'
}

export const sexLimitStatusOptions = genOptionList(sexLimitStatus, sexLimitStatusMap)

// 性别
export const sexStatus = {
  MALE: 1,
  FEMALE: 2,
}

export const sexStatusMap = {
  [sexStatus.MALE]: '男性',
  [sexStatus.FEMALE]: '女性'
}

export const sexStatusOptions = genOptionList(sexStatus, sexStatusMap)

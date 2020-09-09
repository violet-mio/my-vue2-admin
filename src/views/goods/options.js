import { genOptionList } from '@/utils/index'

export const genderLimitStatus = {
  UNLIMIT: 0,
  LIMIT: 1
}

export const genderLimitStatusMap = {
  [genderLimitStatus.UNLIMIT]: '不限',
  [genderLimitStatus.LIMIT]: '限定'
}

export const genderLimitStatusOptions = genOptionList(genderLimitStatus, genderLimitStatusMap)

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

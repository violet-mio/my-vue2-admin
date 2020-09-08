import { genOptionList } from '@/utils/index'

export const articleStatus = {
  PUBLISHED: 0,
  DRAFT: 1,
  DELETED: 2
}

export const articleStatusMap = {
  [articleStatus.PUBLISHED]: '已发布',
  [articleStatus.DRAFT]: '草稿',
  [articleStatus.DELETED]: '已删除'
}

export const articleStatusOptions = genOptionList(articleStatus, articleStatusMap)

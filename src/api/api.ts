import { IdentifiedSanityDocumentStub, SanityDocumentStub } from '@sanity/client'
import { client } from '../client'
import { IContact, MutationSelection } from '../types/types'

type AttributeSet = { [key: string]: any }

export const fetchingAPI = async (query: string) => {
  return await client.fetch(query)
}

export const createAPI = async (doc: SanityDocumentStub<any>) => {
  return await client.create(doc)
}

export const createIfNotExistsAPI = async (doc: IdentifiedSanityDocumentStub<any>) => {
  return await client.createIfNotExists(doc)
}

export const patchAPI = async (
  documentId: string,
  attrs: AttributeSet,
  inserting: {
    at: 'replace' | 'before' | 'after'
    selector: string
    items: any[]
  }
) => {
  return await client
    .patch(documentId)
    .setIfMissing(attrs)
    .insert(inserting.at, inserting.selector, inserting.items)
    .commit()
}

export const patchInArrayAPI = async (documentId: string, contacts: IContact[]) => {
  return await client.patch(documentId).set({ contacts }).commit()
}

export const deleteAPI = async (documentId: string | MutationSelection, attrs: string[]) => {
  return await client.patch(documentId).unset(attrs).commit()
}

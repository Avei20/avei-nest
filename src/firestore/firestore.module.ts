import { DynamicModule, Module } from '@nestjs/common'
import { FirestoreModuleOptions } from './firestore.types'
import {
  FirestoreCollectionProvider,
  FirestoreDatabaseProvider,
  FirestoreOptionsProvider,
} from './firestore.provider'
import { Firestore, Settings } from '@google-cloud/firestore'

@Module({})
export class FirestoreModule {
  static forRoot(options: FirestoreModuleOptions): DynamicModule {
    const optionsProvider = {
      provide: FirestoreOptionsProvider,
      useFactory: options.useFactory,
      inject: options.inject,
    }

    const dbProvider = {
      provide: FirestoreDatabaseProvider,
      useFactory: (config: Settings) => new Firestore(config),
      inject: [FirestoreOptionsProvider],
    }

    const collectionProvider = FirestoreCollectionProvider.map(
      (providerName) => ({
        provide: providerName,
        useFactory: (db: Firestore) => db.collection(providerName),
        inject: [FirestoreDatabaseProvider],
      }),
    )

    return {
      global: true,
      module: FirestoreModule,
      imports: options.import,
      providers: [optionsProvider, dbProvider, ...collectionProvider],
      exports: [dbProvider, ...collectionProvider],
    }
  }
}

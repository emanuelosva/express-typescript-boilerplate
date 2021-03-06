/**
 * User events actions.
 * --------------------
 *
 * Class to handle user events.
 */

import { EventEmitter } from 'events'
import { Logger } from '../../../lib'
import { Mailer, Templates } from '../../../services/mail'
import { IUser } from '../interfaces'
import { UserEvents } from './constants.events'

export class UserEmitter {
  constructor(
    private emmiter: EventEmitter = new EventEmitter(),
  ) {
    this.emmiter = emmiter
  }

  emmitCreated(email: IUser['email'], name: IUser['name']) {
    this.emmiter.emit(UserEvents.created, email, name)
    this.emmiter.on(UserEvents.created, async (email: IUser['email']) => {
      Logger.info('Sending welcome email to:', email)
      Mailer.sendFromTemplate(email, {
        template: Templates.welcome,
        subject: 'Welcome to my app',
        vars: { name },
      })
    })
  }
}

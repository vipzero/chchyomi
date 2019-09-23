#!/usr/bin/env node

import meow from "meow"
import chalk from "chalk"
import chch from "chch"
import OpenJTalk from "openjtalk"
import { promisify } from "util"
import publicIp from "public-ip"

const mei = new OpenJTalk()
const talk = promisify(mei.talk).bind(mei)

const cli = meow(
  `
  Usage
    $ chchyomi [thread URL]

  Options
    --char, -c talk char length (default 40)

  Examples
    $ chchyomi https://hebi.5ch.net/test/read.cgi/news4vip/1562153470/
    $ chchyomi https://hebi.5ch.net/test/read.cgi/news4vip/1562153470/ -c 20
    
`,
  {
    flags: {
      char: {
        type: "string",
        alias: "c",
      },
    },
  }
)

if (cli.input[0]) {
  yomiage(cli.input[0], cli.flags.char || 40)
}

const sayTextBatch = (text: string, char: number): string =>
  text
    .replace(/[wWｗＷ]{2}/g, "わらわら")
    .replace(/[wWｗｗ]([^a-zA-Z])/g, "わら$1")
    .replace(/っ{2}/g, "っ")
    .replace(/ッ{2}/g, "ッ")
    .replace(/`/g, "")
    .substr(0, char)

async function yomiage(threadURL: string, char: number) {
  console.log(threadURL, char)
  const startIp = await publicIp.v4()
  const taskId = await chch.watch(
    threadURL,
    async (posts, nthCall) => {
      if (nthCall === 0) {
        const lastPost = posts[posts.length - 1]
        if (lastPost) {
          console.log(`${lastPost.number}: ${lastPost.message}`)
          return talk(sayTextBatch(lastPost.message, char))
        }
      }
      const nowIp = await publicIp.v4()
      if (startIp !== nowIp) {
        console.log(chalk.red(`network cahnged`))
        clearInterval(taskId)
      }
      for (const post of posts) {
        console.log(`${post.number}: ${post.message}`)
        await talk(sayTextBatch(post.message, char))
      }
    },
    count => {
      console.log(chalk.gray(`got: ${count}`))
    }
  )
}

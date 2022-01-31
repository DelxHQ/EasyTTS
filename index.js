import { Client, Intents } from 'discord.js'
import { createAudioPlayer, joinVoiceChannel, createAudioResource } from '@discordjs/voice'
import fetch from 'node-fetch'

const TTS_URL = 'https://streamlabs.com/polly/speak'

const client = new Client({
  intents: [Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_VOICE_STATES] 
})

client.on('ready', () => {
  console.log(`Logged in as ${client.user.username}`)
})

client.on('messageCreate', async message => {
  if (message.author.bot) return
  if (message.channel.id !== '556979693203488799') return
  if (!message.member.voice.channel) return
  if (!message.content) return
  if (message.content.startsWith('https://' || 'http://')) return

  const res = await fetch(TTS_URL, {
    method: 'post',
    body: JSON.stringify({
      voice: 'Ivy',
      text: message.content
    }),
    headers: {'Content-Type': 'application/json'}
  })
  const data = await res.json()

  const voiceConnection = joinVoiceChannel({
    channelId: message.member.voice.channel.id,
    guildId: message.guild.id,
    adapterCreator: message.guild.voiceAdapterCreator
  })
  const player = createAudioPlayer()
  voiceConnection.subscribe(player)

  const resource = createAudioResource(data.speak_url)
  player.play(resource)
})

client.login(process.env.LOGIN_TOKEN)

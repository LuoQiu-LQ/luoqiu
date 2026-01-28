'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Copy, Check, ArrowRightLeft, Trash2 } from 'lucide-react'

export default function ToolsPage() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [copied, setCopied] = useState<'input' | 'output' | null>(null)
  const [mode, setMode] = useState<'format' | 'minify'>('format')

  const formatJSON = (str: string) => {
    try {
      const parsed = JSON.parse(str)
      setOutput(JSON.stringify(parsed, null, 2))
      setError('')
    } catch (e: any) {
      setError(e.message)
    }
  }

  const minifyJSON = (str: string) => {
    try {
      const parsed = JSON.parse(str)
      setOutput(JSON.stringify(parsed))
      setError('')
    } catch (e: any) {
      setError(e.message)
    }
  }

  const handleTransform = () => {
    if (!input.trim()) {
      setError('请输入 JSON 内容')
      return
    }
    if (mode === 'format') {
      formatJSON(input)
    } else {
      minifyJSON(input)
    }
  }

  const handleClear = () => {
    setInput('')
    setOutput('')
    setError('')
  }

  const handleCopy = async (type: 'input' | 'output') => {
    const text = type === 'input' ? input : output
    await navigator.clipboard.writeText(text)
    setCopied(type)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
      <header className="mb-12">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          工具箱
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          实用的在线工具集合
        </p>
      </header>

      {/* JSON Tools */}
      <Card className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="text-2xl">📝</div>
            <div>
              <h2 className="font-semibold text-gray-900 dark:text-white">JSON 格式化</h2>
              <p className="text-sm text-gray-500 dark:text-gray-500">
                格式化或压缩 JSON 数据
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Badge variant={mode === 'format' ? 'primary' : 'default'}>
              格式化
            </Badge>
            <Badge variant={mode === 'minify' ? 'primary' : 'default'}>
              压缩
            </Badge>
          </div>
        </div>

        {/* Mode Toggle */}
        <div className="flex gap-2 mb-4">
          <Button
            variant={mode === 'format' ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => setMode('format')}
          >
            格式化
          </Button>
          <Button
            variant={mode === 'minify' ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => setMode('minify')}
          >
            压缩
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {/* Input */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                输入
              </label>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" onClick={handleClear}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="粘贴 JSON 内容..."
              className="w-full h-64 px-4 py-3 font-mono text-sm bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>

          {/* Output */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                输出
              </label>
              {output && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleCopy('output')}
                >
                  {copied === 'output' ? (
                    <Check className="w-4 h-4 text-green-500" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </Button>
              )}
            </div>
            <textarea
              value={output}
              readOnly
              placeholder="转换结果..."
              className="w-full h-64 px-4 py-3 font-mono text-sm bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 resize-none"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="mt-4 flex gap-4">
          <Button onClick={handleTransform}>
            <ArrowRightLeft className="w-4 h-4 mr-2" />
            转换
          </Button>
          {error && (
            <p className="text-red-500 text-sm self-center">{error}</p>
          )}
        </div>
      </Card>

      {/* More Tools Coming Soon */}
      <Card className="text-center py-12">
        <p className="text-gray-600 dark:text-gray-400">
          更多工具开发中...
        </p>
      </Card>
    </div>
  )
}

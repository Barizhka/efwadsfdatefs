import { createClient } from '@supabase/supabase-js'

console.log('🚀 Starting names update process...')

const supabaseUrl = 'https://pdkjhhfukjgdhxoaxrws.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBka2poaGZ1a2pnZGh4b2F4cndzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc4MDk2MjYsImV4cCI6MjA3MzM4NTYyNn0.0iopIvcSc9POzm3FhvEWy4yBPhn9oMxWuPlPA1nM6H0'

const supabase = createClient(supabaseUrl, supabaseKey)

async function runNamesUpdate() {
  try {
    console.log('📞 Calling update-account-names function...')
    const { data, error } = await supabase.functions.invoke('update-account-names')
    
    if (error) {
      console.error('❌ Error calling function:', error)
      return
    }
    
    console.log('✅ Function executed successfully!')
    console.log('📊 Result:', JSON.stringify(data, null, 2))
    
    // Verify results
    console.log('🔍 Checking remaining incorrect names...')
    const { data: remainingIncorrect } = await supabase
      .from('accounts')
      .select('count', { count: 'exact', head: true })
      .or('name.like.Ирина %ов,name.like.Ирина %ев,name.like.Анна %ов,name.like.Анна %ев,name.like.Мария %ов,name.like.Мария %ев,name.like.Елена %ов,name.like.Елена %ев,name.like.Татьяна %ов,name.like.Татьяна %ев,name.like.Ольга %ов,name.like.Ольга %ев,name.like.Екатерина %ов,name.like.Екатерина %ев,name.like.Наталья %ов,name.like.Наталья %ев,name.like.Светлана %ов,name.like.Светлана %ев,name.like.Марина %ов,name.like.Марина %ев')

    console.log(`📈 Remaining incorrect names: ${remainingIncorrect?.count || 0}`)
    
  } catch (err) {
    console.error('💥 Exception occurred:', err)
  }
}

runNamesUpdate()
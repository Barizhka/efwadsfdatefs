// Quick test script to invoke update-account-names function
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://pdkjhhfukjgdhxoaxrws.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBka2poaGZ1a2pnZGh4b2F4cndzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc4MDk2MjYsImV4cCI6MjA3MzM4NTYyNn0.0iopIvcSc9POzm3FhvEWy4yBPhn9oMxWuPlPA1nM6H0'

const supabase = createClient(supabaseUrl, supabaseKey)

async function testUpdateNames() {
  console.log('🚀 Invoking update-account-names function...')
  
  try {
    const { data, error } = await supabase.functions.invoke('update-account-names')
    
    if (error) {
      console.error('❌ Error:', error)
    } else {
      console.log('✅ Success:', data)
    }
  } catch (err) {
    console.error('💥 Exception:', err)
  }
}

testUpdateNames()
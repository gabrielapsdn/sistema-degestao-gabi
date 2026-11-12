import { useEffect, useState, useMemo, useCallback } from 'react'
import './App.css'
import {
  listarFuncionarios,
  criarFuncionario,
  atualizarFuncionario,
  deletarFuncionario,
  listarTarefas,
  criarTarefa,
  atualizarTarefa,
  deletarTarefa,
} from './api'

// Inline SVG Icons for clean, zero-dependency modern styling
const Icons = {
  Logo: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 16v1a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v1" />
      <path d="M18 8h4a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-4" />
      <circle cx="8" cy="12" r="2" />
      <path d="m22 12-4-2v4z" />
    </svg>
  ),
  Dashboard: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="7" height="9" x="3" y="3" rx="1" />
      <rect width="7" height="5" x="14" y="3" rx="1" />
      <rect width="7" height="9" x="14" y="12" rx="1" />
      <rect width="7" height="5" x="3" y="16" rx="1" />
    </svg>
  ),
  Users: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  Tasks: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="8" height="4" x="8" y="2" rx="1" />
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      <path d="m9 14 2 2 4-4" />
    </svg>
  ),
  Search: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  ),
  User: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
  Mail: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  ),
  IdCard: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="14" x="2" y="5" rx="2" />
      <line x1="2" x2="22" y1="10" y2="10" />
    </svg>
  ),
  Lock: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  ),
  Calendar: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <line x1="16" x2="16" y1="2" y2="6" />
      <line x1="8" x2="8" y1="2" y2="6" />
      <line x1="3" x2="21" y1="10" y2="10" />
    </svg>
  ),
  Save: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="m5 12 5 5L20 7" />
    </svg>
  ),
  Cancel: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  ),
  Edit: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
      <path d="m15 5 4 4" />
    </svg>
  ),
  Trash: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  ),
  Eye: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  EyeOff: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
      <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
      <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
      <line x1="2" x2="22" y1="2" y2="22" />
    </svg>
  ),
  AlertTriangle: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
      <line x1="12" x2="12" y1="9" y2="13" />
      <line x1="12" x2="12.01" y1="17" y2="17" />
    </svg>
  ),
  CheckCircle: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  ),
  Clock: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ),
}

const FORMULARIO_VAZIO = { nome: '', email: '', cpf: '', senha: '' }
const FORMULARIO_TAREFA_VAZIO = { titulo: '', dataEntrega: '', funcionarioId: '' }

// CPF mask helper
function formatarCPF(valor) {
  const digits = valor.replace(/\D/g, '').slice(0, 11)
  if (digits.length <= 3) return digits
  if (digits.length <= 6) return `${digits.slice(0, 3)}.${digits.slice(3)}`
  if (digits.length <= 9) return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6)}`
  return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}-${digits.slice(9)}`
}

// Get initials for avatar
function getIniciais(nome = '') {
  const partes = nome.trim().split(/\s+/)
  if (partes.length === 0 || !partes[0]) return '?'
  if (partes.length === 1) return partes[0].slice(0, 2).toUpperCase()
  return (partes[0][0] + partes[partes.length - 1][0]).toUpperCase()
}

function App() {
  const [abaAtiva, setAbaAtiva] = useState('dashboard') // 'dashboard' | 'funcionarios' | 'tarefas'
  const [mostrarSenha, setMostrarSenha] = useState(false)

  // Funcionários State
  const [funcionarios, setFuncionarios] = useState([])
  const [formulario, setFormulario] = useState({ ...FORMULARIO_VAZIO })
  const [editandoId, setEditandoId] = useState(null)
  const [filtroFuncionario, setFiltroFuncionario] = useState('')
  const [salvando, setSalvando] = useState(false)

  // Tarefas State
  const [tarefas, setTarefas] = useState([])
  const [formTarefa, setFormTarefa] = useState({ ...FORMULARIO_TAREFA_VAZIO })
  const [editandoTarefaId, setEditandoTarefaId] = useState(null)
  const [filtroTarefa, setFiltroTarefa] = useState('')
  const [salvandoTarefa, setSalvandoTarefa] = useState(false)

  // Notifications State
  const [notificacao, setNotificacao] = useState(null) // { tipo: 'success' | 'error', texto: string }

  // Modal Deletion State
  const [modalExclusao, setModalExclusao] = useState(null) // { tipo: 'funcionario' | 'tarefa', item: object }

  function exibirNotificacao(tipo, texto) {
    setNotificacao({ tipo, texto })
  }

  function fecharNotificacao() {
    setNotificacao(null)
  }

  // Auto-dismiss notification after 5 seconds
  useEffect(() => {
    if (!notificacao) return
    const timer = setTimeout(() => {
      setNotificacao(null)
    }, 5000)
    return () => clearTimeout(timer)
  }, [notificacao])

  // Initial Data Fetch
  useEffect(() => {
    let ativo = true

    async function carregarDados() {
      try {
        const [listaFuncionarios, listaTarefas] = await Promise.all([
          listarFuncionarios(),
          listarTarefas(),
        ])
        if (!ativo) return
        setFuncionarios(listaFuncionarios)
        setTarefas(listaTarefas)
      } catch (erroApi) {
        if (!ativo) return
        exibirNotificacao('error', erroApi.message || 'Erro ao carregar dados do servidor.')
      }
    }

    carregarDados()

    return () => {
      ativo = false
    }
  }, [])

  // ==========================================
  // Manipulação de Funcionários
  // ==========================================
  function alterarCampo(campo, valor) {
    if (campo === 'cpf') {
      valor = formatarCPF(valor)
    }
    setFormulario((atual) => ({ ...atual, [campo]: valor }))
  }

  function editar(funcionario) {
    setAbaAtiva('funcionarios')
    setEditandoId(funcionario.id)
    setFormulario({
      nome: funcionario.nome,
      email: funcionario.email,
      cpf: funcionario.cpf,
      senha: '',
    })
    document.getElementById('formulario-funcionario')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  function cancelar() {
    setEditandoId(null)
    setFormulario({ ...FORMULARIO_VAZIO })
  }

  async function salvar(evento) {
    evento.preventDefault()
    setSalvando(true)

    try {
      const dados = {
        nome: formulario.nome.trim(),
        email: formulario.email.trim(),
        cpf: formulario.cpf.trim(),
      }

      let idSalvo

      if (editandoId) {
        if (formulario.senha) {
          dados.senha = formulario.senha
        }
        const salvo = await atualizarFuncionario(editandoId, dados)
        idSalvo = salvo.id
        exibirNotificacao('success', `Colaborador "${salvo.nome}" atualizado com sucesso!`)
      } else {
        if (!formulario.senha) {
          exibirNotificacao('error', 'Informe a senha do novo colaborador.')
          setSalvando(false)
          return
        }
        const criado = await criarFuncionario({ ...dados, senha: formulario.senha })
        idSalvo = criado.id
        exibirNotificacao('success', `Colaborador "${criado.nome}" cadastrado com sucesso!`)
      }

      const lista = await listarFuncionarios()
      setFuncionarios(lista)
      cancelar()

      setTimeout(() => {
        document.getElementById('funcionario-' + idSalvo)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }, 100)
    } catch (erroApi) {
      exibirNotificacao('error', erroApi.message)
    } finally {
      setSalvando(false)
    }
  }

  function abrirModalExcluirFuncionario(funcionario) {
    setModalExclusao({ tipo: 'funcionario', item: funcionario })
  }

  async function confirmarExclusao() {
    if (!modalExclusao) return
    const { tipo, item } = modalExclusao

    try {
      if (tipo === 'funcionario') {
        await deletarFuncionario(item.id)
        const lista = await listarFuncionarios()
        setFuncionarios(lista)
        exibirNotificacao('success', `Colaborador "${item.nome}" removido.`)
      } else if (tipo === 'tarefa') {
        await deletarTarefa(item.id)
        const lista = await listarTarefas()
        setTarefas(lista)
        exibirNotificacao('success', `Tarefa "${item.titulo}" removida.`)
      }
    } catch (erroApi) {
      exibirNotificacao('error', erroApi.message)
    } finally {
      setModalExclusao(null)
    }
  }

  // ==========================================
  // Manipulação de Tarefas
  // ==========================================
  function alterarCampoTarefa(campo, valor) {
    setFormTarefa((atual) => ({ ...atual, [campo]: valor }))
  }

  function editarTarefa(tarefa) {
    setAbaAtiva('tarefas')
    setEditandoTarefaId(tarefa.id)
    setFormTarefa({
      titulo: tarefa.titulo,
      dataEntrega: tarefa.dataEntrega ? String(tarefa.dataEntrega).slice(0, 10) : '',
      funcionarioId: tarefa.funcionarioId,
    })
    document.getElementById('formulario-tarefa')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  function cancelarTarefa() {
    setEditandoTarefaId(null)
    setFormTarefa({ ...FORMULARIO_TAREFA_VAZIO })
  }

  async function salvarTarefa(evento) {
    evento.preventDefault()
    setSalvandoTarefa(true)

    try {
      const dados = {
        titulo: formTarefa.titulo.trim(),
        dataEntrega: formTarefa.dataEntrega,
        funcionarioId: Number(formTarefa.funcionarioId),
      }

      let idSalvo

      if (editandoTarefaId) {
        const salvo = await atualizarTarefa(editandoTarefaId, dados)
        idSalvo = salvo.id
        exibirNotificacao('success', `Tarefa "${salvo.titulo}" atualizada!`)
      } else {
        const criado = await criarTarefa(dados)
        idSalvo = criado.id
        exibirNotificacao('success', `Tarefa "${criado.titulo}" cadastrada!`)
      }

      const lista = await listarTarefas()
      setTarefas(lista)
      cancelarTarefa()

      setTimeout(() => {
        document.getElementById('tarefa-' + idSalvo)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }, 100)
    } catch (erroApi) {
      exibirNotificacao('error', erroApi.message)
    } finally {
      setSalvandoTarefa(false)
    }
  }

  function abrirModalExcluirTarefa(tarefa) {
    setModalExclusao({ tipo: 'tarefa', item: tarefa })
  }

  const nomeFuncionario = useCallback(
    (id) => {
      const f = funcionarios.find((item) => item.id === id)
      return f ? f.nome : `Funcionário #${id}`
    },
    [funcionarios]
  )

  // Filtering Lists
  const funcionariosFiltrados = useMemo(() => {
    if (!filtroFuncionario.trim()) return funcionarios
    const termo = filtroFuncionario.toLowerCase()
    return funcionarios.filter(
      (f) =>
        f.nome?.toLowerCase().includes(termo) ||
        f.email?.toLowerCase().includes(termo) ||
        f.cpf?.includes(termo)
    )
  }, [funcionarios, filtroFuncionario])

  const tarefasFiltradas = useMemo(() => {
    if (!filtroTarefa.trim()) return tarefas
    const termo = filtroTarefa.toLowerCase()
    return tarefas.filter((t) => {
      const nomeResp = (t.funcionario?.nome || nomeFuncionario(t.funcionarioId) || '').toLowerCase()
      return t.titulo?.toLowerCase().includes(termo) || nomeResp.includes(termo)
    })
  }, [tarefas, filtroTarefa, nomeFuncionario])

  // Statistics
  const metricas = useMemo(() => {
    const hoje = new Date().toISOString().slice(0, 10)
    const tarefasComResponsavel = tarefas.filter((t) => t.funcionarioId).length
    const tarefasEmBreve = tarefas.filter((t) => {
      if (!t.dataEntrega) return false
      const data = String(t.dataEntrega).slice(0, 10)
      return data >= hoje
    }).length

    return {
      totalFuncionarios: funcionarios.length,
      totalTarefas: tarefas.length,
      tarefasComResponsavel,
      tarefasEmBreve,
    }
  }, [funcionarios, tarefas])

  return (
    <div className="app-wrapper">
      {/* Toast Alert Banner */}
      {notificacao && (
        <div className="toast-container">
          <div className={`toast ${notificacao.tipo === 'success' ? 'toast-success' : 'toast-error'}`}>
            {notificacao.tipo === 'success' ? <Icons.CheckCircle /> : <Icons.AlertTriangle />}
            <span>{notificacao.texto}</span>
            <button className="toast-close-btn" onClick={fecharNotificacao} title="Fechar aviso">
              <Icons.Cancel />
            </button>
          </div>
        </div>
      )}

      {/* Top Navbar */}
      <header className="app-header">
        <div className="header-container">
          <div className="brand-section" onClick={() => setAbaAtiva('dashboard')}>
            <div className="brand-icon-box">
              <Icons.Logo />
            </div>
            <div className="brand-info">
              <h1>
                GestãoPro <span className="brand-badge">Enterprise</span>
              </h1>
              <span className="brand-subtitle">Controle de Colaboradores &amp; Tarefas</span>
            </div>
          </div>

          <nav className="nav-pill-group">
            <button
              className={`nav-pill ${abaAtiva === 'dashboard' ? 'active' : ''}`}
              onClick={() => setAbaAtiva('dashboard')}
            >
              <Icons.Dashboard />
              <span>Visão Geral</span>
            </button>
            <button
              className={`nav-pill ${abaAtiva === 'funcionarios' ? 'active' : ''}`}
              onClick={() => setAbaAtiva('funcionarios')}
            >
              <Icons.Users />
              <span>Funcionários</span>
            </button>
            <button
              className={`nav-pill ${abaAtiva === 'tarefas' ? 'active' : ''}`}
              onClick={() => setAbaAtiva('tarefas')}
            >
              <Icons.Tasks />
              <span>Tarefas</span>
            </button>
          </nav>

          <div className="user-pill-card">
            <div className="user-avatar">GN</div>
            <div className="user-details">
              <span className="user-name">Gabriela do Nascimento</span>
              <span className="user-tag">Turma 3º B</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Body */}
      <main className="main-container">
        {/* KPI Stats Row (Always visible or in Dashboard) */}
        <section className="stats-grid">
          <div className="stat-card" onClick={() => setAbaAtiva('funcionarios')} style={{ cursor: 'pointer' }}>
            <div className="stat-icon blue">
              <Icons.Users />
            </div>
            <div className="stat-content">
              <span className="stat-label">Colaboradores</span>
              <span className="stat-value">{metricas.totalFuncionarios}</span>
            </div>
          </div>

          <div className="stat-card" onClick={() => setAbaAtiva('tarefas')} style={{ cursor: 'pointer' }}>
            <div className="stat-icon purple">
              <Icons.Tasks />
            </div>
            <div className="stat-content">
              <span className="stat-label">Tarefas Cadastradas</span>
              <span className="stat-value">{metricas.totalTarefas}</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon emerald">
              <Icons.Calendar />
            </div>
            <div className="stat-content">
              <span className="stat-label">Tarefas Vigentes</span>
              <span className="stat-value">{metricas.tarefasEmBreve}</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon amber">
              <Icons.Clock />
            </div>
            <div className="stat-content">
              <span className="stat-label">Atribuições Ativas</span>
              <span className="stat-value">{metricas.tarefasComResponsavel}</span>
            </div>
          </div>
        </section>

        {/* ========================================================
            ABA: DASHBOARD (Visão Geral Integrada)
           ======================================================== */}
        {abaAtiva === 'dashboard' && (
          <div className="content-grid animate-fade">
            <div className="section-header">
              <div className="section-title-wrap">
                <h2>Painel Executivo</h2>
                <p>Resumo em tempo real dos colaboradores e cronograma de atividades.</p>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '24px' }}>
              {/* Quick Card: Colaboradores Recentes */}
              <div className="panel-card">
                <div className="card-top">
                  <div className="card-title-group">
                    <div className="card-icon-box">
                      <Icons.Users />
                    </div>
                    <div>
                      <h3>Equipe de Colaboradores</h3>
                      <p>{funcionarios.length} membro(s) cadastrado(s)</p>
                    </div>
                  </div>
                  <button className="btn-secondary" onClick={() => setAbaAtiva('funcionarios')}>
                    Ver Todos
                  </button>
                </div>
                <div className="card-body" style={{ padding: 0 }}>
                  {funcionarios.length === 0 ? (
                    <div className="empty-box">
                      <div className="empty-icon-circle">
                        <Icons.Users />
                      </div>
                      <h4>Nenhum colaborador registrado</h4>
                      <p>Cadastre novos funcionários para começar a gerenciar.</p>
                      <button className="btn-primary" onClick={() => setAbaAtiva('funcionarios')}>
                        Cadastrar Agora
                      </button>
                    </div>
                  ) : (
                    <div className="table-responsive">
                      <table className="modern-table">
                        <thead>
                          <tr>
                            <th>Colaborador</th>
                            <th>E-mail</th>
                            <th>CPF</th>
                          </tr>
                        </thead>
                        <tbody>
                          {funcionarios.slice(0, 5).map((f) => (
                            <tr key={f.id}>
                              <td>
                                <div className="user-cell">
                                  <div className="avatar-initials">{getIniciais(f.nome)}</div>
                                  <span className="user-name-text">{f.nome}</span>
                                </div>
                              </td>
                              <td>
                                <span className="email-tag">{f.email}</span>
                              </td>
                              <td>
                                <span className="cpf-badge">{f.cpf}</span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>

              {/* Quick Card: Tarefas Recentes */}
              <div className="panel-card">
                <div className="card-top">
                  <div className="card-title-group">
                    <div className="card-icon-box">
                      <Icons.Tasks />
                    </div>
                    <div>
                      <h3>Atividades do Cronograma</h3>
                      <p>{tarefas.length} tarefa(s) registrada(s)</p>
                    </div>
                  </div>
                  <button className="btn-secondary" onClick={() => setAbaAtiva('tarefas')}>
                    Ver Todas
                  </button>
                </div>
                <div className="card-body" style={{ padding: 0 }}>
                  {tarefas.length === 0 ? (
                    <div className="empty-box">
                      <div className="empty-icon-circle">
                        <Icons.Tasks />
                      </div>
                      <h4>Nenhuma tarefa cadastrada</h4>
                      <p>Crie novas atividades e distribua entre os membros da equipe.</p>
                      <button className="btn-primary" onClick={() => setAbaAtiva('tarefas')}>
                        Criar Tarefa
                      </button>
                    </div>
                  ) : (
                    <div className="table-responsive">
                      <table className="modern-table">
                        <thead>
                          <tr>
                            <th>Título</th>
                            <th>Entrega</th>
                            <th>Responsável</th>
                          </tr>
                        </thead>
                        <tbody>
                          {tarefas.slice(0, 5).map((t) => (
                            <tr key={t.id}>
                              <td>
                                <span className="task-title-cell">{t.titulo}</span>
                              </td>
                              <td>
                                <span className="date-pill upcoming">
                                  <Icons.Calendar />
                                  {t.dataEntrega ? new Date(t.dataEntrega).toLocaleDateString('pt-BR') : '-'}
                                </span>
                              </td>
                              <td>
                                <span className="user-name-text">
                                  {t.funcionario?.nome || nomeFuncionario(t.funcionarioId)}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================
            ABA: FUNCIONÁRIOS
           ======================================================== */}
        {abaAtiva === 'funcionarios' && (
          <div className="content-grid animate-fade">
            {/* Header & Search */}
            <div className="section-header">
              <div className="section-title-wrap">
                <h2>Gerenciamento de Funcionários</h2>
                <p>Cadastre, visualize, edite e gerencie o quadro de colaboradores.</p>
              </div>
              <div className="toolbar-bar">
                <div className="search-input-wrapper">
                  <span className="search-icon">
                    <Icons.Search />
                  </span>
                  <input
                    type="text"
                    className="search-input"
                    placeholder="Buscar por nome, email ou CPF..."
                    value={filtroFuncionario}
                    onChange={(e) => setFiltroFuncionario(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Form Card */}
            <div className="panel-card" id="formulario-funcionario">
              <div className="card-top">
                <div className="card-title-group">
                  <div className="card-icon-box">
                    <Icons.User />
                  </div>
                  <div>
                    <h3>{editandoId ? `Editar Colaborador #${editandoId}` : 'Novo Colaborador'}</h3>
                    <p>Preencha os dados abaixo com as informações corporativas.</p>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <form onSubmit={salvar}>
                  <div className="form-grid-fields">
                    <div className="form-field">
                      <label htmlFor="func-nome">
                        Nome Completo <span className="required-star">*</span>
                      </label>
                      <div className="field-input-box">
                        <span className="field-icon">
                          <Icons.User />
                        </span>
                        <input
                          id="func-nome"
                          required
                          value={formulario.nome}
                          onChange={(e) => alterarCampo('nome', e.target.value)}
                          placeholder="Ex: João da Silva"
                        />
                      </div>
                    </div>

                    <div className="form-field">
                      <label htmlFor="func-email">
                        E-mail Corporativo <span className="required-star">*</span>
                      </label>
                      <div className="field-input-box">
                        <span className="field-icon">
                          <Icons.Mail />
                        </span>
                        <input
                          id="func-email"
                          required
                          type="email"
                          value={formulario.email}
                          onChange={(e) => alterarCampo('email', e.target.value)}
                          placeholder="joao@empresa.com"
                        />
                      </div>
                    </div>

                    <div className="form-field">
                      <label htmlFor="func-cpf">
                        CPF <span className="required-star">*</span>
                      </label>
                      <div className="field-input-box">
                        <span className="field-icon">
                          <Icons.IdCard />
                        </span>
                        <input
                          id="func-cpf"
                          required
                          value={formulario.cpf}
                          onChange={(e) => alterarCampo('cpf', e.target.value)}
                          placeholder="000.000.000-00"
                        />
                      </div>
                    </div>

                    <div className="form-field">
                      <label htmlFor="func-senha">
                        Senha de Acesso {editandoId ? '' : <span className="required-star">*</span>}
                      </label>
                      <div className="field-input-box">
                        <span className="field-icon">
                          <Icons.Lock />
                        </span>
                        <input
                          id="func-senha"
                          required={!editandoId}
                          type={mostrarSenha ? 'text' : 'password'}
                          value={formulario.senha}
                          onChange={(e) => alterarCampo('senha', e.target.value)}
                          placeholder={editandoId ? 'Deixar em branco para manter' : 'Crie uma senha segura'}
                        />
                        <button
                          type="button"
                          className="toggle-password-btn"
                          onClick={() => setMostrarSenha((v) => !v)}
                          title={mostrarSenha ? 'Ocultar senha' : 'Ver senha'}
                        >
                          {mostrarSenha ? <Icons.EyeOff /> : <Icons.Eye />}
                        </button>
                      </div>
                      {editandoId && (
                        <span className="field-helper">Preencha apenas se desejar redefinir a senha</span>
                      )}
                    </div>
                  </div>

                  <div className="form-btn-row">
                    <button type="submit" className="btn-primary" disabled={salvando}>
                      {salvando ? <span className="spinner" /> : <Icons.Save />}
                      <span>{editandoId ? 'Atualizar Colaborador' : 'Cadastrar Colaborador'}</span>
                    </button>
                    <button type="button" className="btn-secondary" onClick={cancelar}>
                      <Icons.Cancel />
                      <span>{editandoId ? 'Cancelar Edição' : 'Limpar Formulário'}</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* List Table Card */}
            <div className="panel-card" id="lista">
              <div className="card-top">
                <div className="card-title-group">
                  <div className="card-icon-box">
                    <Icons.Users />
                  </div>
                  <div>
                    <h3>Quadro de Colaboradores</h3>
                    <p>
                      {funcionariosFiltrados.length} de {funcionarios.length} funcionário(s) listado(s)
                    </p>
                  </div>
                </div>
              </div>
              <div className="card-body" style={{ padding: 0 }}>
                {funcionariosFiltrados.length === 0 ? (
                  <div className="empty-box">
                    <div className="empty-icon-circle">
                      <Icons.Users />
                    </div>
                    <h4>Nenhum colaborador encontrado</h4>
                    <p>
                      {filtroFuncionario
                        ? 'Não encontramos nenhum resultado para a sua busca.'
                        : 'Comece adicionando novos funcionários pelo formulário acima.'}
                    </p>
                  </div>
                ) : (
                  <div className="table-responsive">
                    <table className="modern-table">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Colaborador</th>
                          <th>E-mail</th>
                          <th>CPF</th>
                          <th style={{ textAlign: 'right' }}>Ações</th>
                        </tr>
                      </thead>
                      <tbody>
                        {funcionariosFiltrados.map((funcionario) => (
                          <tr key={funcionario.id} id={'funcionario-' + funcionario.id}>
                            <td className="col-id">#{funcionario.id}</td>
                            <td>
                              <div className="user-cell">
                                <div className="avatar-initials">{getIniciais(funcionario.nome)}</div>
                                <span className="user-name-text">{funcionario.nome}</span>
                              </div>
                            </td>
                            <td>
                              <span className="email-tag">{funcionario.email}</span>
                            </td>
                            <td>
                              <span className="cpf-badge">{funcionario.cpf}</span>
                            </td>
                            <td style={{ textAlign: 'right' }}>
                              <div className="action-buttons-cell" style={{ justifyContent: 'flex-end' }}>
                                <button
                                  className="action-btn edit"
                                  onClick={() => editar(funcionario)}
                                  title="Editar informações"
                                >
                                  <Icons.Edit />
                                  <span>Editar</span>
                                </button>
                                <button
                                  className="action-btn delete"
                                  onClick={() => abrirModalExcluirFuncionario(funcionario)}
                                  title="Excluir funcionário"
                                >
                                  <Icons.Trash />
                                  <span>Excluir</span>
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================
            ABA: TAREFAS
           ======================================================== */}
        {abaAtiva === 'tarefas' && (
          <div className="content-grid animate-fade">
            {/* Header & Search */}
            <div className="section-header">
              <div className="section-title-wrap">
                <h2>Gerenciamento de Tarefas</h2>
                <p>Distribua demandas, estipule prazos e monitore entregas.</p>
              </div>
              <div className="toolbar-bar">
                <div className="search-input-wrapper">
                  <span className="search-icon">
                    <Icons.Search />
                  </span>
                  <input
                    type="text"
                    className="search-input"
                    placeholder="Buscar por título ou responsável..."
                    value={filtroTarefa}
                    onChange={(e) => setFiltroTarefa(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Form Card */}
            <div className="panel-card" id="formulario-tarefa">
              <div className="card-top">
                <div className="card-title-group">
                  <div className="card-icon-box">
                    <Icons.Tasks />
                  </div>
                  <div>
                    <h3>{editandoTarefaId ? `Editar Tarefa #${editandoTarefaId}` : 'Criar Nova Tarefa'}</h3>
                    <p>Atribua responsabilidades e prazos para a sua equipe.</p>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <form onSubmit={salvarTarefa}>
                  <div className="form-grid-fields">
                    <div className="form-field">
                      <label htmlFor="tar-titulo">
                        Título da Tarefa <span className="required-star">*</span>
                      </label>
                      <div className="field-input-box">
                        <span className="field-icon">
                          <Icons.Tasks />
                        </span>
                        <input
                          id="tar-titulo"
                          required
                          value={formTarefa.titulo}
                          onChange={(e) => alterarCampoTarefa('titulo', e.target.value)}
                          placeholder="Ex: Elaborar relatório financeiro"
                        />
                      </div>
                    </div>

                    <div className="form-field">
                      <label htmlFor="tar-data">
                        Data de Entrega <span className="required-star">*</span>
                      </label>
                      <div className="field-input-box">
                        <span className="field-icon">
                          <Icons.Calendar />
                        </span>
                        <input
                          id="tar-data"
                          required
                          type="date"
                          value={formTarefa.dataEntrega}
                          onChange={(e) => alterarCampoTarefa('dataEntrega', e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="form-field">
                      <label htmlFor="tar-func">
                        Colaborador Responsável <span className="required-star">*</span>
                      </label>
                      <div className="field-input-box">
                        <span className="field-icon">
                          <Icons.User />
                        </span>
                        <select
                          id="tar-func"
                          required
                          value={formTarefa.funcionarioId}
                          onChange={(e) => alterarCampoTarefa('funcionarioId', e.target.value)}
                        >
                          <option value="">Selecione um colaborador...</option>
                          {funcionarios.map((f) => (
                            <option key={f.id} value={f.id}>
                              {f.nome} (ID: #{f.id})
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="form-btn-row">
                    <button type="submit" className="btn-primary" disabled={salvandoTarefa}>
                      {salvandoTarefa ? <span className="spinner" /> : <Icons.Save />}
                      <span>{editandoTarefaId ? 'Atualizar Tarefa' : 'Salvar Tarefa'}</span>
                    </button>
                    <button type="button" className="btn-secondary" onClick={cancelarTarefa}>
                      <Icons.Cancel />
                      <span>{editandoTarefaId ? 'Cancelar' : 'Limpar'}</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* List Table Card */}
            <div className="panel-card" id="lista-tarefas">
              <div className="card-top">
                <div className="card-title-group">
                  <div className="card-icon-box">
                    <Icons.Tasks />
                  </div>
                  <div>
                    <h3>Cronograma de Entregas</h3>
                    <p>
                      {tarefasFiltradas.length} de {tarefas.length} tarefa(s) listada(s)
                    </p>
                  </div>
                </div>
              </div>
              <div className="card-body" style={{ padding: 0 }}>
                {tarefasFiltradas.length === 0 ? (
                  <div className="empty-box">
                    <div className="empty-icon-circle">
                      <Icons.Tasks />
                    </div>
                    <h4>Nenhuma tarefa cadastrada</h4>
                    <p>
                      {filtroTarefa
                        ? 'Não encontramos tarefas que coincidam com a pesquisa.'
                        : 'Cadastre tarefas acima para planejar o fluxo de trabalho.'}
                    </p>
                  </div>
                ) : (
                  <div className="table-responsive">
                    <table className="modern-table">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Título da Tarefa</th>
                          <th>Data de Entrega</th>
                          <th>Responsável</th>
                          <th style={{ textAlign: 'right' }}>Ações</th>
                        </tr>
                      </thead>
                      <tbody>
                        {tarefasFiltradas.map((tarefa) => (
                          <tr key={tarefa.id} id={'tarefa-' + tarefa.id}>
                            <td className="col-id">#{tarefa.id}</td>
                            <td>
                              <span className="task-title-cell">{tarefa.titulo}</span>
                            </td>
                            <td>
                              <span className="date-pill upcoming">
                                <Icons.Calendar />
                                {tarefa.dataEntrega
                                  ? new Date(tarefa.dataEntrega).toLocaleDateString('pt-BR')
                                  : '-'}
                              </span>
                            </td>
                            <td>
                              <div className="user-cell">
                                <div className="avatar-initials" style={{ width: '28px', height: '28px', fontSize: '0.75rem' }}>
                                  {getIniciais(tarefa.funcionario ? tarefa.funcionario.nome : nomeFuncionario(tarefa.funcionarioId))}
                                </div>
                                <span className="user-name-text">
                                  {tarefa.funcionario ? tarefa.funcionario.nome : nomeFuncionario(tarefa.funcionarioId)}
                                </span>
                              </div>
                            </td>
                            <td style={{ textAlign: 'right' }}>
                              <div className="action-buttons-cell" style={{ justifyContent: 'flex-end' }}>
                                <button
                                  className="action-btn edit"
                                  onClick={() => editarTarefa(tarefa)}
                                  title="Editar tarefa"
                                >
                                  <Icons.Edit />
                                  <span>Editar</span>
                                </button>
                                <button
                                  className="action-btn delete"
                                  onClick={() => abrirModalExcluirTarefa(tarefa)}
                                  title="Excluir tarefa"
                                >
                                  <Icons.Trash />
                                  <span>Excluir</span>
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Delete Confirmation Modal */}
      {modalExclusao && (
        <div className="modal-overlay" onClick={() => setModalExclusao(null)}>
          <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="modal-warning-icon">
              <Icons.AlertTriangle />
            </div>
            <h3>Confirmar Exclusão</h3>
            <p>
              Tem certeza de que deseja excluir {modalExclusao.tipo === 'funcionario' ? 'o colaborador' : 'a tarefa'}{' '}
              <strong>"{modalExclusao.item.nome || modalExclusao.item.titulo}"</strong>?
              {modalExclusao.tipo === 'funcionario' && (
                <span style={{ display: 'block', marginTop: '6px', fontSize: '0.8rem', color: '#64748b' }}>
                  Nota: Não é possível excluir colaboradores com tarefas pendentes.
                </span>
              )}
            </p>
            <div className="modal-actions">
              <button className="btn-cancel-modal" onClick={() => setModalExclusao(null)}>
                Cancelar
              </button>
              <button className="btn-danger-confirm" onClick={confirmarExclusao}>
                Sim, Excluir
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer - Copyright com o nome solicitado: gabriela do nascimento 3b */}
      <footer className="app-footer">
        <div className="footer-inner">
          <div className="footer-copy">
            <span className="footer-copy-main">
              &copy; {new Date().getFullYear()} Desenvolvido por{' '}
              <span className="student-highlight">Gabriela do Nascimento</span>
              <span className="class-badge">3º B</span>
            </span>
            <span className="footer-copy-sub">
              Sistema de Gestão Integrada de Funcionários e Tarefas &bull; Projeto de Desenvolvimento de Sistemas
            </span>
          </div>

          <div className="tech-badges">
            <span className="tech-tag">React 19</span>
            <span className="tech-tag">Vite</span>
            <span className="tech-tag">Node.js</span>
            <span className="tech-tag">Prisma ORM</span>
            <span className="tech-tag">PostgreSQL</span>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App

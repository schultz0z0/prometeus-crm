# 🚀 Deploy do Twenty CRM na VPS com Traefik

Guia passo a passo para colocar o **Twenty CRM** em produção no domínio **`solucoes-nexus.tech`**, conectado ao seu Traefik existente.

---

## 📌 Como o Traefik conversa com o Twenty CRM?

No seu Traefik, você está usando:
```yaml
network_mode: host
```
Isso significa que o Traefik roda diretamente na pilha de rede do host (VPS). No Linux:
- O Traefik tem acesso direto aos IPs internos de qualquer rede Docker criada (`bridge`).
- Ele monitora os containers através do `/var/run/docker.sock`.
- As labels do container `server` instruem o Traefik a rotear `https://solucoes-nexus.tech` para a porta interna `3000` do container.
- **Vantagem de segurança**: nenhuma porta (como 3000) precisa ser exposta publicamente no host. Apenas o Traefik (80/443) recebe tráfego externo.

---

## 📋 Pré-requisitos

1. **DNS configurado**:
   - Tipo `A` apontando `solucoes-nexus.tech` para o IP público da sua VPS.
   - (Opcional) Tipo `A` ou `CNAME` para `www.solucoes-nexus.tech`.
2. **Portas 80 e 443 liberadas** no firewall da VPS (UFW / Security Group da nuvem).
3. **Traefik rodando** na VPS (como mostrado no seu compose).

---

## 🛠️ Passo a Passo para Subir na VPS

### 1. Criar a pasta na VPS
Acesse a sua VPS via SSH e crie um diretório para o Twenty CRM:
```bash
mkdir -p /opt/twenty-crm
cd /opt/twenty-crm
```

### 2. Copiar os arquivos
Copie o conteúdo de [docker-compose.yml](file:///d:/Projetos%20SaaS/CRM/deploy/docker-compose.yml) e [.env](file:///d:/Projetos%20SaaS/CRM/deploy/.env) para `/opt/twenty-crm/` na VPS:
```bash
# Na VPS:
nano docker-compose.yml   # cole o conteudo do docker-compose.yml
nano .env                 # cole o conteudo do .env
```

> **Dica**: O arquivo `.env` gerado já possui uma chave de criptografia de 32 bytes (`ENCRYPTION_KEY`) e senha de banco de dados gerada aleatoriamente.

### 3. Iniciar o Twenty CRM
Na pasta `/opt/twenty-crm`, execute:
```bash
docker compose pull
docker compose up -d
```

### 4. Acompanhar a inicialização
O Twenty executará as migrações iniciais de banco de dados na primeira vez. Você pode acompanhar os logs com:
```bash
docker compose logs -f server
```

Quando o log exibir que o servidor HTTP está pronto na porta 3000, acesse:
👉 **`https://solucoes-nexus.tech`**

O Traefik solicitará o certificado SSL automaticamente junto ao Let's Encrypt via HTTP challenge na porta 80 e redirecionará para HTTPS.

---

## 🔄 Comandos Úteis de Manutenção

- **Ver status dos containers**:
  ```bash
  docker compose ps
  ```
- **Ver logs do Traefik** (se precisar verificar emissão de SSL):
  ```bash
  docker logs -f <nome-do-container-do-traefik>
  ```
- **Reiniciar os serviços**:
  ```bash
  docker compose restart
  ```
- **Atualizar para a versão mais recente**:
  ```bash
  docker compose pull
  docker compose up -d
  ```

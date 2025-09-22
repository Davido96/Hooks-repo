let SessionLoad = 1
let s:so_save = &g:so | let s:siso_save = &g:siso | setg so=0 siso=0 | setl so=-1 siso=-1
let v:this_session=expand("<sfile>:p")
silent only
silent tabonly
cd ~/Desktop/codes/webapps/hooks/config
if expand('%') == '' && !&modified && line('$') <= 1 && getline(1) == ''
  let s:wipebuf = bufnr('%')
endif
let s:shortmess_save = &shortmess
if &shortmess =~ 'A'
  set shortmess=aoOA
else
  set shortmess=aoO
endif
badd +22 urls.py
badd +12 asgi.py
badd +50 settings.py
argglobal
%argdel
edit settings.py
let s:save_splitbelow = &splitbelow
let s:save_splitright = &splitright
set splitbelow splitright
wincmd _ | wincmd |
vsplit
1wincmd h
wincmd w
wincmd _ | wincmd |
split
1wincmd k
wincmd w
let &splitbelow = s:save_splitbelow
let &splitright = s:save_splitright
wincmd t
let s:save_winminheight = &winminheight
let s:save_winminwidth = &winminwidth
set winminheight=0
set winheight=1
set winminwidth=0
set winwidth=1
exe 'vert 1resize ' . ((&columns * 95 + 95) / 190)
exe '2resize ' . ((&lines * 17 + 19) / 38)
exe 'vert 2resize ' . ((&columns * 94 + 95) / 190)
exe '3resize ' . ((&lines * 17 + 19) / 38)
exe 'vert 3resize ' . ((&columns * 94 + 95) / 190)
argglobal
balt urls.py
vnoremap <buffer> <silent>  ghr :Gitsigns reset_hunk
nnoremap <buffer> <silent>  ghr :Gitsigns reset_hunk
vnoremap <buffer> <silent>  ghs :Gitsigns stage_hunk
nnoremap <buffer> <silent>  ghs :Gitsigns stage_hunk
nnoremap <buffer>  cR TypescriptRenameFile
nnoremap <buffer>  co TypescriptOrganizeImports
xnoremap <buffer> <silent> ih :Gitsigns select_hunk
onoremap <buffer> <silent> ih :Gitsigns select_hunk
setlocal keymap=
setlocal noarabic
setlocal autoindent
setlocal nobinary
setlocal breakindent
setlocal breakindentopt=shift:0
setlocal bufhidden=
setlocal buflisted
setlocal buftype=
setlocal nocindent
setlocal cinkeys=0{,0},0),0],:,!^F,o,O,e
setlocal cinoptions=
setlocal cinscopedecls=public,protected,private
setlocal cinwords=if,else,while,do,for,switch
setlocal colorcolumn=
setlocal comments=b:#,fb:-
setlocal commentstring=#\ %s
setlocal complete=.,w,b,u,t
setlocal completefunc=
setlocal completeslash=
setlocal concealcursor=
setlocal conceallevel=0
setlocal nocopyindent
setlocal nocursorbind
setlocal nocursorcolumn
setlocal cursorline
setlocal cursorlineopt=both
setlocal define=^\\s*\\(\\(async\\s\\+\\)\\?def\\|class\\)
setlocal nodiff
setlocal eventignorewin=
setlocal expandtab
if &filetype != 'python'
setlocal filetype=python
endif
setlocal fixendofline
setlocal foldcolumn=0
setlocal foldenable
setlocal foldexpr=v:lua.LazyVim.treesitter.foldexpr()
setlocal foldignore=#
setlocal foldlevel=99
setlocal foldmarker={{{,}}}
setlocal foldmethod=expr
setlocal foldminlines=1
setlocal foldnestmax=20
setlocal foldtext=
setlocal formatexpr=v:lua.LazyVim.format.formatexpr()
setlocal formatlistpat=^\\s*\\d\\+[\\]:.)}\\t\ ]\\s*
setlocal formatoptions=jcroqlnt
setlocal iminsert=0
setlocal imsearch=-1
setlocal include=^\\s*\\(from\\|import\\)
setlocal includeexpr=substitute(substitute(substitute(v:fname,b:grandparent_match,b:grandparent_sub,''),b:parent_match,b:parent_sub,''),b:child_match,b:child_sub,'g')
setlocal indentexpr=v:lua.LazyVim.treesitter.indentexpr()
setlocal indentkeys=0{,0},0),0],:,!^F,o,O,e,<:>,=elif,=except
setlocal noinfercase
setlocal iskeyword=@,48-57,_,192-255
setlocal keywordprg=python3\ -m\ pydoc
setlocal linebreak
setlocal nolisp
setlocal lispoptions=
setlocal list
setlocal matchpairs=(:),{:},[:]
setlocal modeline
setlocal modifiable
setlocal nrformats=bin,hex
setlocal number
setlocal numberwidth=4
setlocal omnifunc=v:lua.vim.lsp.omnifunc
setlocal nopreserveindent
setlocal nopreviewwindow
setlocal quoteescape=\\
setlocal noreadonly
setlocal norelativenumber
setlocal norightleft
setlocal rightleftcmd=search
setlocal scrollback=-1
setlocal noscrollbind
setlocal shiftwidth=4
setlocal signcolumn=yes
setlocal smartindent
setlocal smoothscroll
setlocal softtabstop=4
setlocal nospell
setlocal spellcapcheck=[.?!]\\_[\\])'\"\\t\ ]\\+
setlocal spellfile=
setlocal spelllang=en
setlocal spelloptions=noplainbuffer
setlocal statuscolumn=%!v:lua.LazyVim.statuscolumn()
setlocal statusline=%#lualine_a_normal#\ NORMAL\ %#lualine_transitional_lualine_a_normal_to_lualine_b_normal#%#lualine_b_normal#\ \ backend\ %#lualine_transitional_lualine_b_normal_to_lualine_c_8_normal#%<%#lualine_c_8_normal#\ 󱉭\ \ hooks\ %#lualine_c_normal#%#lualine_c_filetype_MiniIconsYellow_normal#\ 󰌠\ %#lualine_c_normal#%#lualine_c_normal#%#lualine_c_11_LV_Bold_normal#\ asgi.py%#lualine_c_normal#\ %#lualine_c_normal#%=%#lualine_x_6_normal#\ \ 2\ %#lualine_c_normal#%#lualine_x_diff_added_normal#\ \ 4\ %#lualine_x_diff_removed_normal#\ 1\ %#lualine_transitional_lualine_b_normal_to_lualine_x_diff_removed_normal#%#lualine_b_normal#\ 63%%\ %#lualine_b_normal#\ 12:1\ \ %#lualine_transitional_lualine_a_normal_to_lualine_b_normal#%#lualine_a_normal#\ \ 01:47\ 
setlocal suffixesadd=.py
setlocal swapfile
setlocal synmaxcol=3000
if &syntax != ''
setlocal syntax=
endif
setlocal tabstop=4
setlocal tagfunc=v:lua.vim.lsp.tagfunc
setlocal textwidth=0
setlocal undofile
setlocal varsofttabstop=
setlocal vartabstop=
setlocal winblend=0
setlocal nowinfixbuf
setlocal nowinfixheight
setlocal nowinfixwidth
setlocal winhighlight=
setlocal wrap
setlocal wrapmargin=0
let s:l = 245 - ((30 * winheight(0) + 17) / 35)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 245
normal! 0
wincmd w
argglobal
if bufexists(fnamemodify("urls.py", ":p")) | buffer urls.py | else | edit urls.py | endif
if &buftype ==# 'terminal'
  silent file urls.py
endif
nnoremap <buffer>  cR TypescriptRenameFile
nnoremap <buffer>  co TypescriptOrganizeImports
vnoremap <buffer> <silent>  ghr :Gitsigns reset_hunk
nnoremap <buffer> <silent>  ghr :Gitsigns reset_hunk
vnoremap <buffer> <silent>  ghs :Gitsigns stage_hunk
nnoremap <buffer> <silent>  ghs :Gitsigns stage_hunk
xnoremap <buffer> <silent> ih :Gitsigns select_hunk
onoremap <buffer> <silent> ih :Gitsigns select_hunk
setlocal keymap=
setlocal noarabic
setlocal autoindent
setlocal nobinary
setlocal breakindent
setlocal breakindentopt=shift:0
setlocal bufhidden=
setlocal buflisted
setlocal buftype=
setlocal nocindent
setlocal cinkeys=0{,0},0),0],:,!^F,o,O,e
setlocal cinoptions=
setlocal cinscopedecls=public,protected,private
setlocal cinwords=if,else,while,do,for,switch
setlocal colorcolumn=
setlocal comments=b:#,fb:-
setlocal commentstring=#\ %s
setlocal complete=.,w,b,u,t
setlocal completefunc=
setlocal completeslash=
setlocal concealcursor=
setlocal conceallevel=0
setlocal nocopyindent
setlocal nocursorbind
setlocal nocursorcolumn
setlocal cursorline
setlocal cursorlineopt=both
setlocal define=^\\s*\\(\\(async\\s\\+\\)\\?def\\|class\\)
setlocal nodiff
setlocal eventignorewin=
setlocal expandtab
if &filetype != 'python'
setlocal filetype=python
endif
setlocal fixendofline
setlocal foldcolumn=0
setlocal foldenable
setlocal foldexpr=v:lua.LazyVim.treesitter.foldexpr()
setlocal foldignore=#
setlocal foldlevel=99
setlocal foldmarker={{{,}}}
setlocal foldmethod=expr
setlocal foldminlines=1
setlocal foldnestmax=20
setlocal foldtext=
setlocal formatexpr=v:lua.LazyVim.format.formatexpr()
setlocal formatlistpat=^\\s*\\d\\+[\\]:.)}\\t\ ]\\s*
setlocal formatoptions=jcroqlnt
setlocal iminsert=0
setlocal imsearch=-1
setlocal include=^\\s*\\(from\\|import\\)
setlocal includeexpr=substitute(substitute(substitute(v:fname,b:grandparent_match,b:grandparent_sub,''),b:parent_match,b:parent_sub,''),b:child_match,b:child_sub,'g')
setlocal indentexpr=v:lua.LazyVim.treesitter.indentexpr()
setlocal indentkeys=0{,0},0),0],:,!^F,o,O,e,<:>,=elif,=except
setlocal noinfercase
setlocal iskeyword=@,48-57,_,192-255
setlocal keywordprg=python3\ -m\ pydoc
setlocal linebreak
setlocal nolisp
setlocal lispoptions=
setlocal list
setlocal matchpairs=(:),{:},[:]
setlocal modeline
setlocal modifiable
setlocal nrformats=bin,hex
setlocal number
setlocal numberwidth=4
setlocal omnifunc=v:lua.vim.lsp.omnifunc
setlocal nopreserveindent
setlocal nopreviewwindow
setlocal quoteescape=\\
setlocal noreadonly
setlocal norelativenumber
setlocal norightleft
setlocal rightleftcmd=search
setlocal scrollback=-1
setlocal noscrollbind
setlocal shiftwidth=4
setlocal signcolumn=yes
setlocal smartindent
setlocal smoothscroll
setlocal softtabstop=4
setlocal nospell
setlocal spellcapcheck=[.?!]\\_[\\])'\"\\t\ ]\\+
setlocal spellfile=
setlocal spelllang=en
setlocal spelloptions=noplainbuffer
setlocal statuscolumn=%!v:lua.LazyVim.statuscolumn()
setlocal statusline=%#lualine_a_normal#\ NORMAL\ %#lualine_transitional_lualine_a_normal_to_lualine_b_normal#%#lualine_b_normal#\ \ backend\ %#lualine_transitional_lualine_b_normal_to_lualine_c_8_normal#%<%#lualine_c_8_normal#\ 󱉭\ \ hooks\ %#lualine_c_normal#%#lualine_c_filetype_MiniIconsYellow_normal#\ 󰌠\ %#lualine_c_normal#%#lualine_c_normal#%#lualine_c_11_LV_Bold_normal#\ asgi.py%#lualine_c_normal#\ %#lualine_c_normal#%=%#lualine_x_6_normal#\ \ 2\ %#lualine_c_normal#%#lualine_x_diff_added_normal#\ \ 4\ %#lualine_x_diff_removed_normal#\ 1\ %#lualine_transitional_lualine_b_normal_to_lualine_x_diff_removed_normal#%#lualine_b_normal#\ 63%%\ %#lualine_b_normal#\ 12:1\ \ %#lualine_transitional_lualine_a_normal_to_lualine_b_normal#%#lualine_a_normal#\ \ 01:47\ 
setlocal suffixesadd=.py
setlocal swapfile
setlocal synmaxcol=3000
if &syntax != ''
setlocal syntax=
endif
setlocal tabstop=4
setlocal tagfunc=v:lua.vim.lsp.tagfunc
setlocal textwidth=0
setlocal undofile
setlocal varsofttabstop=
setlocal vartabstop=
setlocal winblend=0
setlocal nowinfixbuf
setlocal nowinfixheight
setlocal nowinfixwidth
setlocal winhighlight=
setlocal wrap
setlocal wrapmargin=0
let s:l = 11 - ((10 * winheight(0) + 8) / 17)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 11
normal! 055|
wincmd w
argglobal
if bufexists(fnamemodify("asgi.py", ":p")) | buffer asgi.py | else | edit asgi.py | endif
if &buftype ==# 'terminal'
  silent file asgi.py
endif
balt urls.py
vnoremap <buffer> <silent>  ghr :Gitsigns reset_hunk
nnoremap <buffer> <silent>  ghr :Gitsigns reset_hunk
vnoremap <buffer> <silent>  ghs :Gitsigns stage_hunk
nnoremap <buffer> <silent>  ghs :Gitsigns stage_hunk
nnoremap <buffer>  cR TypescriptRenameFile
nnoremap <buffer>  co TypescriptOrganizeImports
xnoremap <buffer> <silent> ih :Gitsigns select_hunk
onoremap <buffer> <silent> ih :Gitsigns select_hunk
setlocal keymap=
setlocal noarabic
setlocal autoindent
setlocal nobinary
setlocal breakindent
setlocal breakindentopt=shift:0
setlocal bufhidden=
setlocal buflisted
setlocal buftype=
setlocal nocindent
setlocal cinkeys=0{,0},0),0],:,!^F,o,O,e
setlocal cinoptions=
setlocal cinscopedecls=public,protected,private
setlocal cinwords=if,else,while,do,for,switch
setlocal colorcolumn=
setlocal comments=b:#,fb:-
setlocal commentstring=#\ %s
setlocal complete=.,w,b,u,t
setlocal completefunc=
setlocal completeslash=
setlocal concealcursor=
setlocal conceallevel=0
setlocal nocopyindent
setlocal nocursorbind
setlocal nocursorcolumn
setlocal cursorline
setlocal cursorlineopt=both
setlocal define=^\\s*\\(\\(async\\s\\+\\)\\?def\\|class\\)
setlocal nodiff
setlocal eventignorewin=
setlocal expandtab
if &filetype != 'python'
setlocal filetype=python
endif
setlocal fixendofline
setlocal foldcolumn=0
setlocal foldenable
setlocal foldexpr=v:lua.LazyVim.treesitter.foldexpr()
setlocal foldignore=#
setlocal foldlevel=99
setlocal foldmarker={{{,}}}
setlocal foldmethod=expr
setlocal foldminlines=1
setlocal foldnestmax=20
setlocal foldtext=
setlocal formatexpr=v:lua.LazyVim.format.formatexpr()
setlocal formatlistpat=^\\s*\\d\\+[\\]:.)}\\t\ ]\\s*
setlocal formatoptions=jcroqlnt
setlocal iminsert=0
setlocal imsearch=-1
setlocal include=^\\s*\\(from\\|import\\)
setlocal includeexpr=substitute(substitute(substitute(v:fname,b:grandparent_match,b:grandparent_sub,''),b:parent_match,b:parent_sub,''),b:child_match,b:child_sub,'g')
setlocal indentexpr=v:lua.LazyVim.treesitter.indentexpr()
setlocal indentkeys=0{,0},0),0],:,!^F,o,O,e,<:>,=elif,=except
setlocal noinfercase
setlocal iskeyword=@,48-57,_,192-255
setlocal keywordprg=python3\ -m\ pydoc
setlocal linebreak
setlocal nolisp
setlocal lispoptions=
setlocal list
setlocal matchpairs=(:),{:},[:]
setlocal modeline
setlocal modifiable
setlocal nrformats=bin,hex
setlocal number
setlocal numberwidth=4
setlocal omnifunc=v:lua.vim.lsp.omnifunc
setlocal nopreserveindent
setlocal nopreviewwindow
setlocal quoteescape=\\
setlocal noreadonly
setlocal norelativenumber
setlocal norightleft
setlocal rightleftcmd=search
setlocal scrollback=-1
setlocal noscrollbind
setlocal shiftwidth=4
setlocal signcolumn=yes
setlocal smartindent
setlocal smoothscroll
setlocal softtabstop=4
setlocal nospell
setlocal spellcapcheck=[.?!]\\_[\\])'\"\\t\ ]\\+
setlocal spellfile=
setlocal spelllang=en
setlocal spelloptions=noplainbuffer
setlocal statuscolumn=%!v:lua.LazyVim.statuscolumn()
setlocal statusline=%#lualine_a_normal#\ NORMAL\ %#lualine_transitional_lualine_a_normal_to_lualine_b_normal#%#lualine_b_normal#\ \ backend\ %#lualine_transitional_lualine_b_normal_to_lualine_c_8_normal#%<%#lualine_c_8_normal#\ 󱉭\ \ hooks\ %#lualine_c_normal#%#lualine_c_filetype_MiniIconsYellow_normal#\ 󰌠\ %#lualine_c_normal#%#lualine_c_normal#%#lualine_c_11_LV_Bold_normal#\ asgi.py%#lualine_c_normal#\ %#lualine_c_normal#%=%#lualine_x_6_normal#\ \ 2\ %#lualine_c_normal#%#lualine_x_diff_added_normal#\ \ 4\ %#lualine_x_diff_removed_normal#\ 1\ %#lualine_transitional_lualine_b_normal_to_lualine_x_diff_removed_normal#%#lualine_b_normal#\ 63%%\ %#lualine_b_normal#\ 12:1\ \ %#lualine_transitional_lualine_a_normal_to_lualine_b_normal#%#lualine_a_normal#\ \ 01:47\ 
setlocal suffixesadd=.py
setlocal swapfile
setlocal synmaxcol=3000
if &syntax != ''
setlocal syntax=
endif
setlocal tabstop=4
setlocal tagfunc=v:lua.vim.lsp.tagfunc
setlocal textwidth=0
setlocal undofile
setlocal varsofttabstop=
setlocal vartabstop=
setlocal winblend=0
setlocal nowinfixbuf
setlocal nowinfixheight
setlocal nowinfixwidth
setlocal winhighlight=
setlocal wrap
setlocal wrapmargin=0
let s:l = 12 - ((10 * winheight(0) + 8) / 17)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 12
normal! 0
wincmd w
3wincmd w
exe 'vert 1resize ' . ((&columns * 95 + 95) / 190)
exe '2resize ' . ((&lines * 17 + 19) / 38)
exe 'vert 2resize ' . ((&columns * 94 + 95) / 190)
exe '3resize ' . ((&lines * 17 + 19) / 38)
exe 'vert 3resize ' . ((&columns * 94 + 95) / 190)
tabnext 1
if exists('s:wipebuf') && len(win_findbuf(s:wipebuf)) == 0 && getbufvar(s:wipebuf, '&buftype') isnot# 'terminal'
  silent exe 'bwipe ' . s:wipebuf
endif
unlet! s:wipebuf
set winheight=1 winwidth=20
let &shortmess = s:shortmess_save
let &winminheight = s:save_winminheight
let &winminwidth = s:save_winminwidth
let s:sx = expand("<sfile>:p:r")."x.vim"
if filereadable(s:sx)
  exe "source " . fnameescape(s:sx)
endif
let &g:so = s:so_save | let &g:siso = s:siso_save
set hlsearch
nohlsearch
doautoall SessionLoadPost
unlet SessionLoad
" vim: set ft=vim :

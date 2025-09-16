let SessionLoad = 1
let s:so_save = &g:so | let s:siso_save = &g:siso | setg so=0 siso=0 | setl so=-1 siso=-1
let v:this_session=expand("<sfile>:p")
silent only
silent tabonly
cd ~/Desktop/codes/webapps/hooks/follows
if expand('%') == '' && !&modified && line('$') <= 1 && getline(1) == ''
  let s:wipebuf = bufnr('%')
endif
let s:shortmess_save = &shortmess
if &shortmess =~ 'A'
  set shortmess=aoOA
else
  set shortmess=aoO
endif
badd +12 urls.py
badd +9 views.py
badd +123 serializers.py
badd +24 models.py
badd +10 permissions.py
argglobal
%argdel
edit urls.py
let s:save_splitbelow = &splitbelow
let s:save_splitright = &splitright
set splitbelow splitright
wincmd _ | wincmd |
vsplit
1wincmd h
wincmd _ | wincmd |
split
1wincmd k
wincmd w
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
exe '1resize ' . ((&lines * 20 + 19) / 38)
exe 'vert 1resize ' . ((&columns * 95 + 95) / 190)
exe '2resize ' . ((&lines * 15 + 19) / 38)
exe 'vert 2resize ' . ((&columns * 95 + 95) / 190)
exe '3resize ' . ((&lines * 20 + 19) / 38)
exe 'vert 3resize ' . ((&columns * 94 + 95) / 190)
exe '4resize ' . ((&lines * 15 + 19) / 38)
exe 'vert 4resize ' . ((&columns * 94 + 95) / 190)
argglobal
balt permissions.py
vnoremap <buffer>  ghr :Gitsigns reset_hunk
nnoremap <buffer>  ghr :Gitsigns reset_hunk
vnoremap <buffer>  ghs :Gitsigns stage_hunk
nnoremap <buffer>  ghs :Gitsigns stage_hunk
nnoremap <buffer>  cR TypescriptRenameFile
nnoremap <buffer>  co TypescriptOrganizeImports
xnoremap <buffer> ih :Gitsigns select_hunk
onoremap <buffer> ih :Gitsigns select_hunk
setlocal keymap=
setlocal noarabic
setlocal autoindent
setlocal nobinary
setlocal nobreakindent
setlocal breakindentopt=
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
setlocal foldexpr=v:lua.require'lazyvim.util'.ui.foldexpr()
setlocal foldignore=#
setlocal foldlevel=99
setlocal foldmarker={{{,}}}
setlocal foldmethod=expr
setlocal foldminlines=1
setlocal foldnestmax=20
setlocal foldtext=
setlocal formatexpr=v:lua.require'lazyvim.util'.format.formatexpr()
setlocal formatlistpat=^\\s*\\d\\+[\\]:.)}\\t\ ]\\s*
setlocal formatoptions=jcroqlnt
setlocal iminsert=0
setlocal imsearch=-1
setlocal include=^\\s*\\(from\\|import\\)
setlocal includeexpr=substitute(substitute(substitute(v:fname,b:grandparent_match,b:grandparent_sub,''),b:parent_match,b:parent_sub,''),b:child_match,b:child_sub,'g')
setlocal indentexpr=nvim_treesitter#indent()
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
setlocal statuscolumn=%!v:lua.require'snacks.statuscolumn'.get()
setlocal statusline=%#lualine_a_insert#\ INSERT\ %#lualine_transitional_lualine_a_insert_to_lualine_b_insert#%#lualine_b_insert#\ \ backend\ %#lualine_transitional_lualine_b_insert_to_lualine_c_5_insert#%<%#lualine_c_5_insert#\ 󱉭\ \ hooks\ %#lualine_c_normal#%#lualine_c_diagnostics_error_insert#\ \ 2\ %#lualine_c_diagnostics_hint_insert#\ 1\ %#lualine_c_normal#%#lualine_c_filetype_MiniIconsYellow_insert#\ 󰌠\ %#lualine_c_normal#%#lualine_c_normal#%#lualine_c_8_LV_Bold_insert#\ serializers.py%#lualine_c_normal#\ %#lualine_c_normal#%#TroubleStatusline0#\ \ %*%#TroubleStatusline1#CreateLikeSerializer%*\ %#TroubleStatusline2#󰊕\ %*%#TroubleStatusline1#validate_like%*\ \ %#lualine_c_normal#%=%#lualine_x_11_insert#\ a\ %#lualine_c_normal#%#lualine_x_12_insert#\ --\ INSERT\ --\ %#lualine_c_normal#%#lualine_x_14_insert#\ \ 14\ %#lualine_c_normal#%#lualine_x_diff_added_insert#\ \ 79\ %#lualine_transitional_lualine_b_insert_to_lualine_x_diff_added_insert#%#lualine_b_insert#\ 82%%\ %#lualine_b_insert#123:39\ %#lualine_transitional_lualine_a_insert_to_lualine_b_insert#%#lualine_a_insert#\ \ 15:32\ 
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
setlocal winhighlight=Normal:Normal,VertSplit:VerticalSplit
setlocal wrap
setlocal wrapmargin=0
let s:l = 12 - ((11 * winheight(0) + 10) / 20)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 12
normal! 0
wincmd w
argglobal
if bufexists(fnamemodify("models.py", ":p")) | buffer models.py | else | edit models.py | endif
if &buftype ==# 'terminal'
  silent file models.py
endif
balt urls.py
nnoremap <buffer>  cR TypescriptRenameFile
nnoremap <buffer>  co TypescriptOrganizeImports
nnoremap <buffer>  ghs :Gitsigns stage_hunk
vnoremap <buffer>  ghs :Gitsigns stage_hunk
nnoremap <buffer>  ghr :Gitsigns reset_hunk
vnoremap <buffer>  ghr :Gitsigns reset_hunk
onoremap <buffer> ih :Gitsigns select_hunk
xnoremap <buffer> ih :Gitsigns select_hunk
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
setlocal foldexpr=v:lua.require'lazyvim.util'.ui.foldexpr()
setlocal foldignore=#
setlocal foldlevel=99
setlocal foldmarker={{{,}}}
setlocal foldmethod=expr
setlocal foldminlines=1
setlocal foldnestmax=20
setlocal foldtext=
setlocal formatexpr=v:lua.require'lazyvim.util'.format.formatexpr()
setlocal formatlistpat=^\\s*\\d\\+[\\]:.)}\\t\ ]\\s*
setlocal formatoptions=jcroqlnt
setlocal iminsert=0
setlocal imsearch=-1
setlocal include=^\\s*\\(from\\|import\\)
setlocal includeexpr=substitute(substitute(substitute(v:fname,b:grandparent_match,b:grandparent_sub,''),b:parent_match,b:parent_sub,''),b:child_match,b:child_sub,'g')
setlocal indentexpr=nvim_treesitter#indent()
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
setlocal scrolloff=4
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
setlocal statuscolumn=%!v:lua.require'snacks.statuscolumn'.get()
setlocal statusline=%#lualine_a_insert#\ INSERT\ %#lualine_transitional_lualine_a_insert_to_lualine_b_insert#%#lualine_b_insert#\ \ backend\ %#lualine_transitional_lualine_b_insert_to_lualine_c_5_insert#%<%#lualine_c_5_insert#\ 󱉭\ \ hooks\ %#lualine_c_normal#%#lualine_c_diagnostics_error_insert#\ \ 2\ %#lualine_c_diagnostics_hint_insert#\ 1\ %#lualine_c_normal#%#lualine_c_filetype_MiniIconsYellow_insert#\ 󰌠\ %#lualine_c_normal#%#lualine_c_normal#%#lualine_c_8_LV_Bold_insert#\ serializers.py%#lualine_c_normal#\ %#lualine_c_normal#%#TroubleStatusline0#\ \ %*%#TroubleStatusline1#CreateLikeSerializer%*\ %#TroubleStatusline2#󰊕\ %*%#TroubleStatusline1#validate_like%*\ \ %#lualine_c_normal#%=%#lualine_x_11_insert#\ a\ %#lualine_c_normal#%#lualine_x_12_insert#\ --\ INSERT\ --\ %#lualine_c_normal#%#lualine_x_14_insert#\ \ 14\ %#lualine_c_normal#%#lualine_x_diff_added_insert#\ \ 79\ %#lualine_transitional_lualine_b_insert_to_lualine_x_diff_added_insert#%#lualine_b_insert#\ 82%%\ %#lualine_b_insert#123:39\ %#lualine_transitional_lualine_a_insert_to_lualine_b_insert#%#lualine_a_insert#\ \ 15:32\ 
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
setlocal virtualedit=block
setlocal winblend=0
setlocal nowinfixbuf
setlocal nowinfixheight
setlocal nowinfixwidth
setlocal winhighlight=Normal:Normal,VertSplit:VerticalSplit
setlocal wrap
setlocal wrapmargin=0
let s:l = 22 - ((9 * winheight(0) + 7) / 15)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 22
normal! 0
wincmd w
argglobal
if bufexists(fnamemodify("views.py", ":p")) | buffer views.py | else | edit views.py | endif
if &buftype ==# 'terminal'
  silent file views.py
endif
balt urls.py
nnoremap <buffer>  cR TypescriptRenameFile
nnoremap <buffer>  co TypescriptOrganizeImports
nnoremap <buffer>  ghs :Gitsigns stage_hunk
vnoremap <buffer>  ghs :Gitsigns stage_hunk
nnoremap <buffer>  ghr :Gitsigns reset_hunk
vnoremap <buffer>  ghr :Gitsigns reset_hunk
onoremap <buffer> ih :Gitsigns select_hunk
xnoremap <buffer> ih :Gitsigns select_hunk
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
setlocal foldexpr=v:lua.require'lazyvim.util'.ui.foldexpr()
setlocal foldignore=#
setlocal foldlevel=99
setlocal foldmarker={{{,}}}
setlocal foldmethod=expr
setlocal foldminlines=1
setlocal foldnestmax=20
setlocal foldtext=
setlocal formatexpr=v:lua.require'lazyvim.util'.format.formatexpr()
setlocal formatlistpat=^\\s*\\d\\+[\\]:.)}\\t\ ]\\s*
setlocal formatoptions=jcroqlnt
setlocal iminsert=0
setlocal imsearch=-1
setlocal include=^\\s*\\(from\\|import\\)
setlocal includeexpr=substitute(substitute(substitute(v:fname,b:grandparent_match,b:grandparent_sub,''),b:parent_match,b:parent_sub,''),b:child_match,b:child_sub,'g')
setlocal indentexpr=nvim_treesitter#indent()
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
setlocal scrolloff=4
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
setlocal statuscolumn=%!v:lua.require'snacks.statuscolumn'.get()
setlocal statusline=%#lualine_a_insert#\ INSERT\ %#lualine_transitional_lualine_a_insert_to_lualine_b_insert#%#lualine_b_insert#\ \ backend\ %#lualine_transitional_lualine_b_insert_to_lualine_c_5_insert#%<%#lualine_c_5_insert#\ 󱉭\ \ hooks\ %#lualine_c_normal#%#lualine_c_diagnostics_error_insert#\ \ 2\ %#lualine_c_diagnostics_hint_insert#\ 1\ %#lualine_c_normal#%#lualine_c_filetype_MiniIconsYellow_insert#\ 󰌠\ %#lualine_c_normal#%#lualine_c_normal#%#lualine_c_8_LV_Bold_insert#\ serializers.py%#lualine_c_normal#\ %#lualine_c_normal#%#TroubleStatusline0#\ \ %*%#TroubleStatusline1#CreateLikeSerializer%*\ %#TroubleStatusline2#󰊕\ %*%#TroubleStatusline1#validate_like%*\ \ %#lualine_c_normal#%=%#lualine_x_11_insert#\ a\ %#lualine_c_normal#%#lualine_x_12_insert#\ --\ INSERT\ --\ %#lualine_c_normal#%#lualine_x_14_insert#\ \ 14\ %#lualine_c_normal#%#lualine_x_diff_added_insert#\ \ 79\ %#lualine_transitional_lualine_b_insert_to_lualine_x_diff_added_insert#%#lualine_b_insert#\ 82%%\ %#lualine_b_insert#123:39\ %#lualine_transitional_lualine_a_insert_to_lualine_b_insert#%#lualine_a_insert#\ \ 15:32\ 
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
setlocal virtualedit=block
setlocal winblend=0
setlocal nowinfixbuf
setlocal nowinfixheight
setlocal nowinfixwidth
setlocal winhighlight=Normal:Normal,VertSplit:VerticalSplit
setlocal wrap
setlocal wrapmargin=0
16
sil! normal! zo
21
sil! normal! zo
29
sil! normal! zo
34
sil! normal! zo
37
sil! normal! zo
43
sil! normal! zo
52
sil! normal! zo
56
sil! normal! zo
59
sil! normal! zo
64
sil! normal! zo
75
sil! normal! zo
80
sil! normal! zo
87
sil! normal! zo
92
sil! normal! zo
105
sil! normal! zo
106
sil! normal! zo
107
sil! normal! zo
113
sil! normal! zo
let s:l = 120 - ((10 * winheight(0) + 10) / 20)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 120
normal! 0
wincmd w
argglobal
if bufexists(fnamemodify("serializers.py", ":p")) | buffer serializers.py | else | edit serializers.py | endif
if &buftype ==# 'terminal'
  silent file serializers.py
endif
balt urls.py
nnoremap <buffer>  cR TypescriptRenameFile
nnoremap <buffer>  co TypescriptOrganizeImports
nnoremap <buffer>  ghs :Gitsigns stage_hunk
vnoremap <buffer>  ghs :Gitsigns stage_hunk
nnoremap <buffer>  ghr :Gitsigns reset_hunk
vnoremap <buffer>  ghr :Gitsigns reset_hunk
onoremap <buffer> ih :Gitsigns select_hunk
xnoremap <buffer> ih :Gitsigns select_hunk
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
setlocal foldexpr=v:lua.require'lazyvim.util'.ui.foldexpr()
setlocal foldignore=#
setlocal foldlevel=99
setlocal foldmarker={{{,}}}
setlocal foldmethod=expr
setlocal foldminlines=1
setlocal foldnestmax=20
setlocal foldtext=
setlocal formatexpr=v:lua.require'lazyvim.util'.format.formatexpr()
setlocal formatlistpat=^\\s*\\d\\+[\\]:.)}\\t\ ]\\s*
setlocal formatoptions=jcroqlnt
setlocal iminsert=0
setlocal imsearch=-1
setlocal include=^\\s*\\(from\\|import\\)
setlocal includeexpr=substitute(substitute(substitute(v:fname,b:grandparent_match,b:grandparent_sub,''),b:parent_match,b:parent_sub,''),b:child_match,b:child_sub,'g')
setlocal indentexpr=nvim_treesitter#indent()
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
setlocal scrolloff=4
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
setlocal statuscolumn=%!v:lua.require'snacks.statuscolumn'.get()
setlocal statusline=%#lualine_a_insert#\ INSERT\ %#lualine_transitional_lualine_a_insert_to_lualine_b_insert#%#lualine_b_insert#\ \ backend\ %#lualine_transitional_lualine_b_insert_to_lualine_c_5_insert#%<%#lualine_c_5_insert#\ 󱉭\ \ hooks\ %#lualine_c_normal#%#lualine_c_diagnostics_error_insert#\ \ 2\ %#lualine_c_diagnostics_hint_insert#\ 1\ %#lualine_c_normal#%#lualine_c_filetype_MiniIconsYellow_insert#\ 󰌠\ %#lualine_c_normal#%#lualine_c_normal#%#lualine_c_8_LV_Bold_insert#\ serializers.py%#lualine_c_normal#\ %#lualine_c_normal#%#TroubleStatusline0#\ \ %*%#TroubleStatusline1#CreateLikeSerializer%*\ %#TroubleStatusline2#󰊕\ %*%#TroubleStatusline1#validate_like%*\ \ %#lualine_c_normal#%=%#lualine_x_11_insert#\ a\ %#lualine_c_normal#%#lualine_x_12_insert#\ --\ INSERT\ --\ %#lualine_c_normal#%#lualine_x_14_insert#\ \ 14\ %#lualine_c_normal#%#lualine_x_diff_added_insert#\ \ 79\ %#lualine_transitional_lualine_b_insert_to_lualine_x_diff_added_insert#%#lualine_b_insert#\ 82%%\ %#lualine_b_insert#123:39\ %#lualine_transitional_lualine_a_insert_to_lualine_b_insert#%#lualine_a_insert#\ \ 10:09\ 
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
setlocal virtualedit=block
setlocal winblend=0
setlocal nowinfixbuf
setlocal nowinfixheight
setlocal nowinfixwidth
setlocal winhighlight=Normal:Normal,VertSplit:VerticalSplit
setlocal wrap
setlocal wrapmargin=0
19
sil! normal! zo
22
sil! normal! zo
38
sil! normal! zo
41
sil! normal! zo
51
sil! normal! zo
65
sil! normal! zo
81
sil! normal! zo
102
sil! normal! zo
117
sil! normal! zo
120
sil! normal! zo
122
sil! normal! zo
135
sil! normal! zo
142
sil! normal! zo
let s:l = 123 - ((6 * winheight(0) + 7) / 15)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 123
normal! 038|
wincmd w
4wincmd w
exe '1resize ' . ((&lines * 20 + 19) / 38)
exe 'vert 1resize ' . ((&columns * 95 + 95) / 190)
exe '2resize ' . ((&lines * 15 + 19) / 38)
exe 'vert 2resize ' . ((&columns * 95 + 95) / 190)
exe '3resize ' . ((&lines * 20 + 19) / 38)
exe 'vert 3resize ' . ((&columns * 94 + 95) / 190)
exe '4resize ' . ((&lines * 15 + 19) / 38)
exe 'vert 4resize ' . ((&columns * 94 + 95) / 190)
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

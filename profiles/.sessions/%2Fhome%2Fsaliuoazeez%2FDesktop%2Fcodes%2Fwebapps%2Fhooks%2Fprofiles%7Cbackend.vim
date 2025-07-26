let SessionLoad = 1
let s:so_save = &g:so | let s:siso_save = &g:siso | setg so=0 siso=0 | setl so=-1 siso=-1
let v:this_session=expand("<sfile>:p")
silent only
silent tabonly
cd ~/Desktop/codes/webapps/hooks/profiles
if expand('%') == '' && !&modified && line('$') <= 1 && getline(1) == ''
  let s:wipebuf = bufnr('%')
endif
let s:shortmess_save = &shortmess
if &shortmess =~ 'A'
  set shortmess=aoOA
else
  set shortmess=aoO
endif
badd +33 ~/Desktop/codes/webapps/hooks/profiles/./views.py
badd +1 urls.py
badd +9 serializers.py
badd +5 models.py
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
exe '1resize ' . ((&lines * 25 + 22) / 45)
exe 'vert 1resize ' . ((&columns * 95 + 95) / 191)
exe '2resize ' . ((&lines * 17 + 22) / 45)
exe 'vert 2resize ' . ((&columns * 95 + 95) / 191)
exe '3resize ' . ((&lines * 25 + 22) / 45)
exe 'vert 3resize ' . ((&columns * 95 + 95) / 191)
exe '4resize ' . ((&lines * 17 + 22) / 45)
exe 'vert 4resize ' . ((&columns * 95 + 95) / 191)
argglobal
balt ~/Desktop/codes/webapps/hooks/profiles/./views.py
nnoremap <buffer>  cR TypescriptRenameFile
nnoremap <buffer>  co TypescriptOrganizeImports
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
setlocal statusline=%#lualine_a_visual#\ VISUAL\ %#lualine_transitional_lualine_a_visual_to_lualine_c_diagnostics_error_visual#%<%#lualine_c_diagnostics_error_visual#\ \ 1\ %#lualine_c_diagnostics_hint_visual#\ 4\ %#lualine_c_normal#%#lualine_c_filetype_MiniIconsYellow_visual#\ 󰌠\ %#lualine_c_normal#%#lualine_c_normal#%#lualine_c_5_LV_Bold_visual#\ views.py%#lualine_c_normal#\ %#lualine_c_normal#%#TroubleStatusline0#\ \ %*%#TroubleStatusline1#ProfileView%*\ %#TroubleStatusline2#󰊕\ %*%#TroubleStatusline1#get%*\ \ %#lualine_c_normal#%=%#lualine_x_9_visual#\ 20\ %#lualine_c_normal#%#lualine_x_10_visual#\ --\ (insert)\ VISUAL\ --\ %#lualine_c_normal#%#lualine_x_12_visual#\ \ 21\ %#lualine_transitional_lualine_b_visual_to_lualine_x_12_visual#%#lualine_b_visual#\ 40%%\ %#lualine_b_visual#\ 20:25\ %#lualine_transitional_lualine_a_visual_to_lualine_b_visual#%#lualine_a_visual#\ \ 21:42\ 
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
let s:l = 6 - ((5 * winheight(0) + 12) / 25)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 6
normal! 062|
wincmd w
argglobal
if bufexists(fnamemodify("models.py", ":p")) | buffer models.py | else | edit models.py | endif
if &buftype ==# 'terminal'
  silent file models.py
endif
balt ~/Desktop/codes/webapps/hooks/profiles/./views.py
nnoremap <buffer>  cR TypescriptRenameFile
nnoremap <buffer>  co TypescriptOrganizeImports
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
setlocal statusline=%#lualine_a_visual#\ VISUAL\ %#lualine_transitional_lualine_a_visual_to_lualine_c_diagnostics_error_visual#%<%#lualine_c_diagnostics_error_visual#\ \ 1\ %#lualine_c_diagnostics_hint_visual#\ 4\ %#lualine_c_normal#%#lualine_c_filetype_MiniIconsYellow_visual#\ 󰌠\ %#lualine_c_normal#%#lualine_c_normal#%#lualine_c_5_LV_Bold_visual#\ views.py%#lualine_c_normal#\ %#lualine_c_normal#%#TroubleStatusline0#\ \ %*%#TroubleStatusline1#ProfileView%*\ %#TroubleStatusline2#󰊕\ %*%#TroubleStatusline1#get%*\ \ %#lualine_c_normal#%=%#lualine_x_9_visual#\ 20\ %#lualine_c_normal#%#lualine_x_10_visual#\ --\ (insert)\ VISUAL\ --\ %#lualine_c_normal#%#lualine_x_12_visual#\ \ 21\ %#lualine_transitional_lualine_b_visual_to_lualine_x_12_visual#%#lualine_b_visual#\ 40%%\ %#lualine_b_visual#\ 20:25\ %#lualine_transitional_lualine_a_visual_to_lualine_b_visual#%#lualine_a_visual#\ \ 21:42\ 
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
let s:l = 3 - ((2 * winheight(0) + 8) / 17)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 3
normal! 0
wincmd w
argglobal
if bufexists(fnamemodify("~/Desktop/codes/webapps/hooks/profiles/./views.py", ":p")) | buffer ~/Desktop/codes/webapps/hooks/profiles/./views.py | else | edit ~/Desktop/codes/webapps/hooks/profiles/./views.py | endif
if &buftype ==# 'terminal'
  silent file ~/Desktop/codes/webapps/hooks/profiles/./views.py
endif
balt urls.py
nnoremap <buffer>  cR TypescriptRenameFile
nnoremap <buffer>  co TypescriptOrganizeImports
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
setlocal statusline=%#lualine_a_insert#\ INSERT\ %#lualine_transitional_lualine_a_insert_to_lualine_c_diagnostics_error_insert#%<%#lualine_c_diagnostics_error_insert#\ \ 1\ %#lualine_c_diagnostics_hint_insert#\ 4\ %#lualine_c_normal#%#lualine_c_filetype_MiniIconsYellow_insert#\ 󰌠\ %#lualine_c_normal#%#lualine_c_normal#%#lualine_c_5_LV_Bold_insert#\ views.py%#lualine_c_normal#\ %#lualine_c_normal#%#TroubleStatusline0#\ \ %*%#TroubleStatusline1#ProfileView%*\ %#TroubleStatusline2#󰊕\ %*%#TroubleStatusline1#get%*\ \ %#lualine_c_normal#%=%#lualine_x_9_insert#\ 20\ %#lualine_c_normal#%#lualine_x_10_insert#\ --\ INSERT\ --\ %#lualine_c_normal#%#lualine_x_12_insert#\ \ 21\ %#lualine_transitional_lualine_b_insert_to_lualine_x_12_insert#%#lualine_b_insert#\ 36%%\ %#lualine_b_insert#\ 18:1\ \ %#lualine_transitional_lualine_a_insert_to_lualine_b_insert#%#lualine_a_insert#\ \ 07:09\ 
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
14
sil! normal! zo
19
sil! normal! zo
21
sil! normal! zo
35
sil! normal! zo
44
sil! normal! zo
let s:l = 18 - ((5 * winheight(0) + 12) / 25)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 18
normal! 0
wincmd w
argglobal
if bufexists(fnamemodify("serializers.py", ":p")) | buffer serializers.py | else | edit serializers.py | endif
if &buftype ==# 'terminal'
  silent file serializers.py
endif
balt ~/Desktop/codes/webapps/hooks/profiles/./views.py
nnoremap <buffer>  cR TypescriptRenameFile
nnoremap <buffer>  co TypescriptOrganizeImports
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
setlocal statusline=%#lualine_a_visual#\ VISUAL\ %#lualine_transitional_lualine_a_visual_to_lualine_c_diagnostics_error_visual#%<%#lualine_c_diagnostics_error_visual#\ \ 1\ %#lualine_c_diagnostics_hint_visual#\ 4\ %#lualine_c_normal#%#lualine_c_filetype_MiniIconsYellow_visual#\ 󰌠\ %#lualine_c_normal#%#lualine_c_normal#%#lualine_c_5_LV_Bold_visual#\ views.py%#lualine_c_normal#\ %#lualine_c_normal#%#TroubleStatusline0#\ \ %*%#TroubleStatusline1#ProfileView%*\ %#TroubleStatusline2#󰊕\ %*%#TroubleStatusline1#get%*\ \ %#lualine_c_normal#%=%#lualine_x_9_visual#\ 20\ %#lualine_c_normal#%#lualine_x_10_visual#\ --\ (insert)\ VISUAL\ --\ %#lualine_c_normal#%#lualine_x_12_visual#\ \ 21\ %#lualine_transitional_lualine_b_visual_to_lualine_x_12_visual#%#lualine_b_visual#\ 40%%\ %#lualine_b_visual#\ 20:25\ %#lualine_transitional_lualine_a_visual_to_lualine_b_visual#%#lualine_a_visual#\ \ 21:42\ 
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
6
sil! normal! zo
let s:l = 16 - ((12 * winheight(0) + 8) / 17)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 16
normal! 018|
wincmd w
3wincmd w
exe '1resize ' . ((&lines * 25 + 22) / 45)
exe 'vert 1resize ' . ((&columns * 95 + 95) / 191)
exe '2resize ' . ((&lines * 17 + 22) / 45)
exe 'vert 2resize ' . ((&columns * 95 + 95) / 191)
exe '3resize ' . ((&lines * 25 + 22) / 45)
exe 'vert 3resize ' . ((&columns * 95 + 95) / 191)
exe '4resize ' . ((&lines * 17 + 22) / 45)
exe 'vert 4resize ' . ((&columns * 95 + 95) / 191)
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

using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using OnlineTests.Models;
using OnlineTests.Repository;
using System.Web.Http.Cors;

namespace OnlineTests.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class TestsController : ApiController
    {
        private TestsEntities db = new TestsEntities();

        TestRepoitory _db = new TestRepoitory();

        // GET: api/Tests
        public IQueryable<Table> GetTables()
        {
            //return db.Tables;
            return _db.List.AsQueryable();
        }

        // GET: api/Tests/5
        [ResponseType(typeof(Table))]
        public IHttpActionResult GetTable(string id)
        {
            Table table = _db.FindById(id);
            
            if (table == null)
            {
                return NotFound();
            }

            return Ok(table);
        }

        // PUT: api/Tests/5
        [ResponseType(typeof(void))]
        public IHttpActionResult Put(string id, Table table)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != table.GUID)
            {
                return BadRequest();
            }

            //db.Entry(table).State = EntityState.Modified;

            try
            {
                _db.Update(table);
                //db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TableExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Tests
        [ResponseType(typeof(Table))]
        public IHttpActionResult Post(Table table)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }                        

            try
            {
                _db.Add(table);                
            }
            catch (DbUpdateException)
            {
                if (TableExists(table.GUID))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = table.GUID }, table);
        }

        // DELETE: api/Tests/5
        [ResponseType(typeof(Table))]
        public IHttpActionResult Delete(string id)
        {
            Table table = _db.FindById(id);

            if (table == null)
            {
                return NotFound();
            }

            _db.Delete(table);
            return Ok(table);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {                
                _db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool TableExists(string id)
        {
            return _db.List.Count(e => e.GUID == id) > 0;
            //return db.Tables.Count(e => e.GUID == id) > 0;
        }
    }
}